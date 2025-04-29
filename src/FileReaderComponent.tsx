import React, { useState, useCallback } from "react";
import CopyToClipboardList from "./CopyToClipboardList";
import styles from "./FileReaderComponent.module.css"; // CSS Modules をインポート

const FileReaderComponent: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            // LF または CRLF で分割し、空文字でない行のみを配列に格納
            const fileLines = content
              .split(/\r\n|\n/)
              .filter((line) => line.trim() !== "");
            setLines(fileLines);
          }
        };

        reader.onerror = () => {
          console.error("ファイルの読み込みに失敗しました。");
          setLines([]);
        };

        // ファイルの文字コードが Shift-JIS の可能性も考慮して読み込む
        const encoding =
          file.type === "text/plain; charset=Shift_JIS" ? "Shift-JIS" : "UTF-8";
        reader.readAsText(file, encoding);
      }
    },
    [setLines]
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        テキストファイル読み込み:
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <div className={styles.listContainer}>
          <CopyToClipboardList items={lines} />
        </div>
      </h3>
    </div>
  );
};

export default FileReaderComponent;
