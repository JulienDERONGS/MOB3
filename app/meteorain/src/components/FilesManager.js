import { DocumentPicker } from 'expo';

export class FilesManager extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          filesNames = {},
          currentActive = '',
        }
    }

    SetCurrentActive(fileName) {
        this.currentActive = fileName;
    }

    GetCurrentActive() {
        return this.currentActive;
    }

    GetFilesNames() {
        return this.filesNames;
    }

    UploadNewFile() {
        echo("TODO");
    }

    CopyFile(fileSource, fileDest) {
        // https://docs.expo.io/versions/latest/sdk/document-picker
        /*_pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
            alert(result.uri);
        console.log(result);
        }*/
    }

    DeleteFile(fileName) {
        // returns bool
    }
}