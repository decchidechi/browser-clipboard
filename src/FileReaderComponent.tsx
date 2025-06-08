/**
 * FileReaderComponent
 *
 */

import React, { useState, useCallback } from "react";
import CopyToClipboardList from "./CopyToClipboardList";
import styles from "./FileReaderComponent.module.css"; // CSS Modules をインポート

/**
 * @returns {JSX.Element} - テキストファイルを読み込み、内容をコピー可能なリストとして表示する React コンポーネント。
 */
const FileReaderComponent: React.FC = () => {
  /**
   * 読み込んだテキストファイルの行を格納するステート。
   * @type {string[]}
   */
  const [lines, setLines] = useState<string[]>([]);
  /**
   * 選択されたファイルのエンコーディングを格納するステート。
   * @type {string}
   */
  const [selectedEncoding, setSelectedEncoding] = useState<string>("UTF-8");

  /**
   * ファイルが選択された際のイベントハンドラー。
   * 選択されたテキストファイルの内容を読み込み、行ごとに `lines` ステートに格納する。
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - ファイル入力要素の change イベント。
   */
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentInputElement = event.currentTarget; // イベントハンドラ内で参照を保持
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

        reader.readAsText(file, selectedEncoding);

        // ファイル処理後にinputの値をリセットする
        // これにより、同じファイルを再度選択した場合でもonChangeイベントが発火
        currentInputElement.value = "";
      }
    },
    [setLines, selectedEncoding] // selectedEncoding を依存配列に追加
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
        <div className={styles.encodingSelector}>
          <label htmlFor="encoding-select">
            ファイルエンコーディング(UTF-8 or SJIS):{" "}
          </label>
          <select
            id="encoding-select"
            value={selectedEncoding}
            onChange={(e) => setSelectedEncoding(e.target.value)}
          >
            <option value="UTF-8">UTF-8</option>
            <option value="Shift-JIS">Shift-JIS</option>
          </select>
        </div>
        <div className={styles.listContainer}>
          <CopyToClipboardList items={lines} />
        </div>
      </h3>
    </div>
  );
};

export default FileReaderComponent;
