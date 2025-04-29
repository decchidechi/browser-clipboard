import React, { useState, useCallback } from "react";
import styles from "./CopyToClipboardList.module.css"; // CSS Modules をインポート

interface CopyToClipboardListProps {
  items: string[];
}

const CopyToClipboardList: React.FC<CopyToClipboardListProps> = ({ items }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyToClipboard = useCallback(
    async (text: string, index: number) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 1500); // 1.5秒後に状態をリセット
      } catch (err) {
        console.error("クリップボードへのコピーに失敗しました:", err);
        // 必要に応じてエラー処理を追加
      }
    },
    [setCopiedIndex]
  );

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>CopyContext</th>
            <th className={styles.th}>CopyButton</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={styles.td}>{item}</td>
              <td className={styles.td}>
                <button
                  className={styles.button}
                  onClick={() => handleCopyToClipboard(item, index)}
                  disabled={copiedIndex === index}
                >
                  {copiedIndex === index ? "Copied" : "Copy"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CopyToClipboardList;
