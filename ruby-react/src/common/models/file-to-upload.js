import uniqueId from "lodash/uniqueId";

export default class FileToUpload {  
    constructor(name, file, isUploaded = false) {
      this.id = uniqueId('fileToUpload_');
      this.name = name;
      this.file = file;
      this.isUploaded = isUploaded;
    }

    getStatus() {
        return this.isUploaded ? 'Success' : 'Uploading...';
    }
  }
  