// Google Apps Script Code for File Upload to Google Drive
// Deploy this as a web app and get the deployment URL

function doPost(e) {
  try {
    console.log('📧 [Apps Script] Received request');

    // Parse the multipart form data
    const data = parseMultipartData(e);
    console.log('📦 [Apps Script] Parsed data:', Object.keys(data));

    // Extract files and form data
    const files = data.files || [];
    const formData = data.fields || {};
    const requestId = formData.requestId || `REQ-${new Date().getTime()}`;

    console.log(`📁 [Apps Script] Processing ${files.length} files for request ${requestId}`);

    // Get or create the upload folder
    const uploadFolder = getOrCreateUploadFolder();

    // Upload files and get download links
    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`📤 [Apps Script] Uploading: ${file.filename} (${file.size} bytes)`);

      try {
        // Create file in Google Drive
        const driveFile = uploadFolder.createFile(file.blob);
        driveFile.setDescription(`Uploaded via Wynqor - Request: ${requestId}`);

        // Set sharing permissions (anyone with link can view)
        driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

        // Generate download URL
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFile.getId()}`;

        uploadedFiles.push({
          name: file.filename,
          size: file.size,
          driveLink: downloadUrl,
          driveId: driveFile.getId(),
          uploadedAt: new Date().toISOString()
        });

        console.log(`✅ [Apps Script] Uploaded: ${file.filename} - Link: ${downloadUrl}`);

      } catch (fileError) {
        console.error(`❌ [Apps Script] Failed to upload ${file.filename}:`, fileError);
        // Continue with other files
      }
    }

    console.log(`✅ [Apps Script] Successfully uploaded ${uploadedFiles.length} of ${files.length} files`);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        uploadedFiles: uploadedFiles,
        requestId: requestId,
        message: `Successfully uploaded ${uploadedFiles.length} files`
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('❌ [Apps Script] Error:', error);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to upload files'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateUploadFolder() {
  const folderName = 'Wynqor_Uploads';

  // Try to find existing folder
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }

  // Create new folder if it doesn't exist
  console.log(`📁 [Apps Script] Creating upload folder: ${folderName}`);
  return DriveApp.createFolder(folderName);
}

function parseMultipartData(e) {
  const data = {};
  const boundary = e.postData.contents.substring(0, e.postData.contents.indexOf('\n')).trim();

  // Simple multipart parser
  const parts = e.postData.contents.split(boundary).slice(1, -1);

  parts.forEach(part => {
    const lines = part.split('\n');
    const headers = {};

    // Parse headers
    let i = 1; // Skip first empty line
    while (i < lines.length && lines[i].trim() !== '') {
      const headerLine = lines[i].trim();
      const colonIndex = headerLine.indexOf(':');
      if (colonIndex > 0) {
        const headerName = headerLine.substring(0, colonIndex).toLowerCase();
        const headerValue = headerLine.substring(colonIndex + 1).trim();
        headers[headerName] = headerValue;
      }
      i++;
    }

    // Get content
    const content = lines.slice(i + 1).join('\n').trim();

    if (headers['content-disposition']) {
      const disposition = headers['content-disposition'];
      const nameMatch = disposition.match(/name="([^"]+)"/);
      const filenameMatch = disposition.match(/filename="([^"]+)"/);

      if (nameMatch) {
        const fieldName = nameMatch[1];

        if (filenameMatch) {
          // This is a file
          const filename = filenameMatch[1];
          const mimeType = headers['content-type'] || 'application/octet-stream';

          if (!data.files) data.files = [];

          data.files.push({
            filename: filename,
            blob: Utilities.newBlob(content, mimeType, filename),
            size: content.length,
            mimeType: mimeType
          });
        } else {
          // This is a form field
          if (!data.fields) data.fields = {};
          data.fields[fieldName] = content;
        }
      }
    }
  });

  return data;
}

// Test function for debugging
function testUpload() {
  console.log('🧪 [Apps Script] Test function called');
  const folder = getOrCreateUploadFolder();
  console.log('📁 [Apps Script] Upload folder:', folder.getName(), folder.getId());
  return 'Test completed';
}



