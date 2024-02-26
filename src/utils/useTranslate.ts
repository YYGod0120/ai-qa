import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';

import { useConversationStore } from '@/store';
type HtmlString = Record<'content' | 'title', string>[];
function HtmlContent(strs: HtmlString) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    ${strs.map((str) => {
      return `<h4>${str.title}</h4>
      <p>${str.content}<p/>
      <hr></hr>
      `;
    })}
  </body>
  </html>`;
}
export function useTranslateHtml() {
  const conversations = useConversationStore((state) => state.conversation);
  const conversation_title = useConversationStore((state) => state.title);
  return async function (id?: number) {
    if (id) {
      if (id > 0) {
        const conversation_ai = conversations[id];
        const conversation_user = conversations[id - 1];
        const content = [
          {
            content: conversation_user.USER,
            title: 'USER' + ' ' + conversation_user.time,
          },
          { content: conversation_ai.AI, title: 'AI' },
        ];
        const contents = HtmlContent(content);
        const rep = await asBlob(contents);
        saveAs(rep, `${conversation_title}.doc`);
      } else {
        const content = [
          {
            content: conversations[id].AI,
            title: 'AI',
          },
        ];
        const contents = HtmlContent(content);
        const rep = await asBlob(contents);
        saveAs(rep, `${conversation_title}.doc`);
      }
    } else {
      const strs: HtmlString = conversations.map((conversation) => {
        const conversation_identity = Object.keys(conversation)[0];
        const conversation_time = Object.values(conversation)[1]
          ? Object.values(conversation)[1]
          : '';
        return {
          content: conversation[conversation_identity],
          title: conversation_identity + ' ' + conversation_time,
        };
      });
      const contents = HtmlContent(strs);
      const rep = await asBlob(contents);
      saveAs(rep, `${conversation_title}.doc`);

      // const blob = new Blob([content], { type: 'application/msword' });
      // FileSaver.saveAs(blob, `${conversation_title}.doc`);
    }
  };
}
