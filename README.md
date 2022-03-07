# Converter Service
This service has the following endpoints and variables:

## Convert image
This request converts an image in a different formats and has options to apply grayscale effect, mirror effect and negative effect on an image.

### Request
`POST: /api/v1/convert-image`

### Data Params
  * file: image file
  * width: number (image size)
  * height: number (image size)
  * format: png, jpeg, jpg (format image)
  * rotate: number (1-360)
  * isActiveGrayScale: true or false (grasy scale effect)
  * isActiveMirrorEffect: true or false (mirror effect)
  * isActiveNegative: true or false (negative effect)

### Response
`{"url": "http://localhost:9090/api/v1/download/image.png"}`

## Combine two images
This request combines two images, one image is over a background image. Also, the image can be given position values on the background image (top and left) and can be given a format image.

### Request
`POST: /api/v1/composite`

### Data Params
  * file: image file
  * backgroundImage: image file
  * images: image file
  * top: number (position)
  * left: number (position)
  * format: jpeg, png, jpg (format image)

### Response
`{"url": "http://localhost:9090/api/v1/download/image-combined.png"}`

## Convert a video
This request converts a video into images according to the frames per second. It returns a download link with the compressed file with all images of the videos.

### Request
`POST: /api/v1/convert-video`

### Data Params
  * file: video file
  * fps: number (frames per second)
  * imageSize: 10-100% (image size in percentage)
  * file: image file
  * file: image file

### Response
`{"url": "http://localhost:9090/api/v1/download/images-converted.zip"}`

## Convert docx to pdf
This request convert .docx format to pdf format.

### Request
`POST: /api/v1/convert-doc-pdf`

### Data Params
  * file: docx file

### Response
`{"url": "http://localhost:9090/api/v1/download/image-combined.png"}`

# Prerequisites
In order to be able to use all the features, make sure you have **ffmpeg** and **Libre Office** installed on your system.

## Installing Ffmpeg
1. Go to http://www.ffmpeg.org/download.html and download the zip file that best suits your computer's specifications 
2. Unzip the zip file to a folder and save the same inside program files. Example: C:\Program Files\ffmpeg\
3. In this folder you will find several other folders, including one titled bin where ffmpeg.exe is saved
4. You need to add this path as environment variables. To do this, follow these steps.
4.1 Do a right click on "this computer" or "This PC" and then click on "Properties > Advanced System Settings > Advanced tab > Environment Variables"
4.2 In the Environment Variables window, click the "Path" row under the "Variable" column, then click Edit
4.3 Paste the path to the folder you created earlier where ffmpeg.exe is saved. For this example, that is, C:\Program Files\ffmpeg\bin\
4.4 Click OK on all the windows we just opened.
5. Ffmpeg is now installed. 

## Installing Libre Office
1. Download Libre Office 7.3.0 [here](https://es.libreoffice.org/descarga/libreoffice/).
2. Install the program with the default values (Is **not** necessary to set Libre Office as the default application to open Microsoft Office files).
3. Install the libreoffice-convert dependency in the project.
3. In node_modules find the **libreoffice-convert/index.js** file and do this:

```bash
change:
let command = `${results.soffice} -env:UserInstallation=file://${installDir.name} --headless --convert-to ${format}`;
to:
let command = `${results.soffice}  --headless --convert-to ${format}`;
```
## Create directories
In **converter-service**, create the directory `files` in `converter-service` directory and the following sub-directories: 
  * files/downloadFiles
  * files/uploads

# Getting Started

1. Clone this repository

    ```bash
      git clone git@github.com:latam-03-at/converter-service.git
      cd converter-service
    ```
2. Install the npm packages

    ```bash
      npm install
    ```
3. Congfigure environment settings
  
    Create a file with the following name and location `.env` and copy the the following environment variables into it. Replace the values with your specific configuration.

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
    ```
