const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  // ========================================
  // UPDATE THESE VALUES WITH YOUR GODADDY CREDENTIALS
  // ========================================
  user: "YOUR_FTP_USERNAME",           // Your GoDaddy FTP username
  password: "YOUR_FTP_PASSWORD",       // Your GoDaddy FTP password
  host: "YOUR_DOMAIN.com",             // Your domain (e.g., example.com)
  port: 21,
  localRoot: __dirname + "/out",       // The static export folder
  remoteRoot: "/public_html/",         // GoDaddy's public folder
  include: ["*", "**/*"],              // Upload all files
  exclude: [],
  deleteRemote: false,                 // Set to true to delete old files first
  forcePasv: true,                     // Required for most FTP connections
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => {
    console.log("✅ Deployment finished successfully!");
    console.log(`📁 Uploaded ${res.length} files`);
  })
  .catch((err) => {
    console.error("❌ Deployment failed:", err);
  });

ftpDeploy.on("uploading", (data) => {
  console.log(`📤 Uploading: ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
});

ftpDeploy.on("uploaded", (data) => {
  console.log(`✔️  Uploaded: ${data.filename}`);
});

ftpDeploy.on("log", (data) => {
  console.log(data);
});
