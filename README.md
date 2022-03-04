# Converter Service
## Description
This rest api has the following endpoints and variables:
* /api/v1/convert-image
  * file
  * width
  * height
  * format
  * rotate
  * isActiveGrayScale
  * isActiveMirrorEffect
  * isActiveNegative    
* /api/v1/composite
  * backgroundImage
  * images
  * top
  * left
  * format
* /api/v1/convert-video
  * file
  * fps
  * imageSize
* /api/v1/convert-doc-pdf
  * file

## Prerequisites
In order to be able to use all the features, make sure you have **ffmpeg** and **Libre Office** installed on your system.

### Installing Ffmpeg
1. Go to http://www.ffmpeg.org/download.html and download the zip file that best suits your computer's specifications 
2. Unzip the zip file to a folder and save the same inside program files. Example: C:\Program Files\ffmpeg\
3. In this folder you will find several other folders, including one titled bin where ffmpeg.exe is saved
4. You need to add this path as environment variables. To do this, follow these steps.
4.1 Do a right click on "this computer" or "This PC" and then click on "Properties > Advanced System Settings > Advanced tab > Environment Variables"
4.2 In the Environment Variables window, click the "Path" row under the "Variable" column, then click Edit
4.3 Paste the path to the folder you created earlier where ffmpeg.exe is saved. For this example, that is, C:\Program Files\ffmpeg\bin\
4.4 Click OK on all the windows we just opened.
5. Ffmpeg is now installed. 

### Installing Libre Office
1. Download Libre Office 7.3.0 [here](https://es.libreoffice.org/descarga/libreoffice/).
2. Install the program with the default values (Is **not** necessary to set Libre Office as the default application to open Microsoft Office files).
3. Install the libreoffice-convert dependency in the project.
3. In node_modules find the **libreoffice-convert/index.js** file and do this:

```sh
change:
let command = `${results.soffice} -env:UserInstallation=file://${installDir.name} --headless --convert-to ${format}`;
to:
let command = `${results.soffice}  --headless --convert-to ${format}`;
```
### Create directories
In **converter-service**, create the directory "files" and the following sub-directories: 
1. files/downloadFiles
2. files/uploads

## Getting Started

1. Clone this repository

   ```bash
   git clone git@github.com:latam-03-at/converter-service.git
   cd converter-service
   ```

2. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

3. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

   ```bash
    PORT=
    URL=
    URLBASE=
    FORMATS_SUPPORTED_VIDEO = ['mov', 'm4a', '3gp', '3g2', 'mj2', 'mp4']
    FORMATS_SUPPORTED_IMAGE = ['jpeg', 'png', 'jpg']
    FORMATS_SUPPORTED_DOC = ['docx']
    MONGO_URI=
    MONGO_DB=
   ```

4. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run start