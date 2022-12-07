import axios from "axios";
import React from "react";
import Item from "../components/display/item";
import Dropbox from "../components/input/dropbox";
import isValidUrl from "../helpers/isValidUrl";
import { useSnackbar } from "react-simple-snackbar";
import Box from "../components/display/Box";

const successSnackbar = {
  style: {
    backgroundColor: "#2e7d32",
    color: "#ccc",
  },
};

const errorSnackbar = {
  style: {
    backgroundColor: "#d32f2f",
    color: "#ccc",
  },
};

const Files = ({ files, directories }: any) => {
  const [openSuccess] = useSnackbar(successSnackbar);
  const [openError] = useSnackbar(errorSnackbar);
  const [url, setUrl] = React.useState("");
  const [newDirectory, setNewDirectory] = React.useState("");
  const [file, setFile] = React.useState<File>();

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files?.length && setFile(e.target.files[0]);

  const handleChangeNewDirectory = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewDirectory(e.target.value);

  const handleCreateDirectory = async () => {
    if (newDirectory !== "") {
      try {
        const folderName = window.location.pathname.replace("/files", "");
        const data = await axios.post("/create-directory", {
          name: newDirectory.replace(" ", "_"),
          where: folderName,
        });
        if (data.data.msg === "ok")
          openSuccess("Directory created successfully.");
        else openError("There was a problem.");
      } catch (error) {
        console.error(error);
        openError("There was a problem.");
      }
    } else {
      openError("Enter the name.");
    }
  };

  const handleUploadUrl = async () => {
    try {
      const urlCheck = isValidUrl(url);
      if (!urlCheck) {
        openError("URL is not valid!");
        return false;
      }
      const data = await axios.post(
        "/upload-url",
        {
          url,
        },
        {
          onDownloadProgress: (progressEvent) => {
            let percentCompleted = Math.floor(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
            );
            console.log("completed: ", percentCompleted);
          },
        }
      );
      console.log({ url, urlCheck, res: data.data });
      if (data.data.msg === "ok")
        openSuccess(
          "URL successfully added. File will be added to the list after download."
        );
      else openError("There was a problem.");
    } catch (error) {
      console.error(error);
      openError("There was a problem.");
    }
  };

  const handleUploadFile = async () => {
    if (file) {
      try {
        const folderName = window.location.pathname.replace("/files", "");
        console.log({ folderName, file });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderName", folderName);
        const data = await axios.post("/upload-file", formData);
        if (data.data.msg === "ok")
          openSuccess(
            "URL successfully added. File will be added to the list after download."
          );
        else if (data.data.msg === "existed")
          openError("There was a file with the same name.");
      } catch (error) {
        console.error(error);
        openError("There was a problem.");
      }
    } else {
      openError("Please select a file.");
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col">
      <div className="mb-8">
        <ul className="w-full">
          {directories.length
            ? directories.map((directory, index) => (
                <Item key={index} item={directory} />
              ))
            : ""}
          {files.length
            ? files.map((file, index) => <Item key={index} item={file} />)
            : ""}
        </ul>
      </div>
      <div className="p-4 border-2 border-bg-light rounded-lg gap-4 flex flex-col mb-8">
        <h3>Create New Directory</h3>
        <input
          type="text"
          placeholder="Name of directory"
          className="rounded-lg px-4 py-2 bg-gray text-white"
          onChange={handleChangeNewDirectory}
          value={newDirectory}
        />
        <button
          className="rounded-lg bg-success border-2 border-success-dark px-4 py-2 hover:bg-success-dark duration-300"
          onClick={handleCreateDirectory}
        >
          Create
        </button>
      </div>
      <Box title="Upload">
        <input
          type="url"
          placeholder="url"
          className="rounded-lg px-4 py-2 bg-gray text-white"
          onChange={handleChangeUrl}
          value={url}
        />
        <button
          className="rounded-lg bg-success border-2 border-success-dark px-4 py-2 hover:bg-success-dark duration-300"
          onClick={handleUploadUrl}
        >
          Upload URL
        </button>
      </Box>
      <Dropbox
        handleChangeFile={handleChangeFile}
        handleUploadFile={handleUploadFile}
      />
    </div>
  );
};

// All pages need to be exported as default
export default Files;
