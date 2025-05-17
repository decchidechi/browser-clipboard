# 使い方

インストール  
```sh
$ npm install
```

ビルド  
```sh
$ npm run build
```

起動方法  
```sh
$ npm run start-browser-clipboard
```

port番号を変更する場合は、以下を変更する  
(デフォルトは3000)  
```json
  "scripts": {
    "start-browser-clipboard": "serve dist -p 3000"
  },
```

- 複数テキストを読み込む場合
  App.tsxに以下を追加する  
```javascript
      <hr /> {/* 区切り線 */}
      <FileReaderComponent />
      <hr /> {/* 区切り線 */}
      <FileReaderComponent />
```
