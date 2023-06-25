import { unlink } from 'fs';

import { messagesName } from "../constants/messages-name.js";
import { showMessage } from "./show-message.js";

export function deleteFile(filePath) {
    unlink(filePath, err => {
      if (err) {
        showMessage(messagesName.error, "File deleted failure!");
      } else {
        showMessage(messagesName.success, "Remove file operation success");
      }
    });
  }