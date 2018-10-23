# Developer documentation
## Class: FilesManager *[Capable of uploading files from other folders, then managing each uploaded file]*

### Attributes
+ **filesNames**: *array* listing all uploaded files names (the newly renamed as **dates** ones).
+ **currentActive**: *string* of the currently selected file, if any, **null** if not.

### Methods
+ **string SetCurrentActive(File)**: Takes a file as parameter, gets its name via its method, set self.currentActive as its name. It will be use when **uploading** (set it right after) and when the user chooses to see the analysis of a **previously uploaded** file. It returns the **name** of this file.
+ **string GetCurrentActive()**: Returns **self.currentActive**.
+ **array GetFilesNames()**: Returns **self.filesNames**
+ **File UploadNewFile(string)**: Starts the uploading process, using the file to upload's **path** as a string. The file will be copied, converted to JSON, and renamed. This new file **pointer** will be returned.
+ **File CopyFile(string, string)**: This method will copy the file given as **1st** parameter (as a **path**), and rename it as the **2nd** parameter. It will return the file **pointer**.
+ **bool DeleteFile(string)**: This method will delete a file which name is given as parameter (as a **name**) **from the safe folder**. It will return **true** upon successful deletion, **false** otherwise.

## Class: File *[Representing each uploaded file]*
### Attributes
+ **fileName**: *string* of this file's name.
+ **JSON**: *JSON array* used when converting the original file's data into JSON. it will act as a buffer until full conversion, then will **become** the contents of the new file.

### Methods
+ **constructor()**: The constructor of this class, it will converts its own data into JSON (via **self.ConvertToJSON()**), replace the data from and rename the file associated with **self.fileName** with the **date** from **self.JSON**, then rename itself as this date via **self.SetFileName()**.
+ **bool ConvertToJSON()**: This method will parse all data contained in the file associated with **self.fileName**, convert it into JSON, and store it in **self.JSON**. It will return **true** upon success, **false** otherwise.
+ **string SetFileName()**: This method will rename its associated file as the date from **self.JSON**, then rename itself (**self.fileName**). It will then return **self.fileName**.
+ **string GetFileName()**: Returns **self.fileName**.
+ **JSON array GetJSON()**: Returns **self.JSON**.