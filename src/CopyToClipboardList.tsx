/**
 * CopyToClipboardList
 *
 */

import React, { useState, useCallback } from "react";
import styles from "./CopyToClipboardList.module.css"; // CSS Modules をインポート

/**
 * @interface CopyToClipboardListProps
 * @property {string[]} items - コピーする文字列の配列。
 */
interface CopyToClipboardListProps {
  items: string[];
}

/**
 * 配列の内容を表形式で表示し、各行にコピーボタンを提供する React コンポーネント。
 *
 * @param {CopyToClipboardListProps} props - コンポーネントの props。
 * @returns {JSX.Element} - レンダリングされた React 要素。
 */
const CopyToClipboardList: React.FC<CopyToClipboardListProps> = ({ items }) => {
  /**
   * コピーが完了した行のインデックスを管理するステート。
   * null の場合は何もコピーされていない状態。
   */
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  /**
   * クリップボードにテキストをコピーする非同期関数。
   * コピー成功時には copiedIndex を更新し、一定時間後にリセットする。
   *
   * @param {string} text - コピーするテキスト。
   * @param {number} index - コピーするテキストの配列におけるインデックス。
   * @returns {void}
   */
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
