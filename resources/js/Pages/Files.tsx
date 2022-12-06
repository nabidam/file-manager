import axios from "axios";
import React from "react";
import Item from "../components/display/item";
import Dropbox from "../components/input/dropbox";
import isValidUrl from "../helpers/isValidUrl";

const Files = ({ files, directories }: any) => {
  const [url, setUrl] = React.useState("");
  const [file, setFile] = React.useState<File>();

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files?.length && setFile(e.target.files[0]);

  const handleUploadUrl = async () => {
    const urlCheck = isValidUrl(url);
    const data = await axios.post("/upload-url", {
      url,
    });
    console.log({ url, urlCheck, res: data.data });
  };

  const handleUploadFile = async () => {
    if (file) {
      console.log(1);
      const formData = new FormData();
      formData.append("file", file);
      const data = await axios.post("/upload-file", formData);
      console.log({ file, res: data.data });
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
        <h3>Upload</h3>
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
      </div>
      <Dropbox
        handleChangeFile={handleChangeFile}
        handleUploadFile={handleUploadFile}
      />
    </div>
  );
};

// All pages need to be exported as default
export default Files;
