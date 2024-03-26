import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { marked } from 'marked';

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
      <div>${str.content}<div/>
      <hr></hr>
      `;
    })}
  </body>
  </html>`;
}
export function useTranslateHtml() {
  const conversations = useConversationStore((state) => state.conversation);
  const conversation_title = useConversationStore((state) => state.title);
  const dealAIres_conversations = async () => {
    const processedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        if (conversation.AI) {
          const ai_res = await marked.parse(conversation.AI[0].answer);
          return {
            AI: ai_res,
            time: conversation.time,
            HUMAN: conversation.HUMAN,
            message_id: conversation.message_id,
          };
        }
        return conversation;
      })
    );
    return processedConversations;
  };
  return async function (id?: number) {
    if (id) {
      if (id > 0) {
        const conversation = await dealAIres_conversations();

        const conversation_ai = conversation[id];
        const conversation_user = conversation[id - 1];
        // //对ai回答进行处理
        // const aiRes = await marked.parse(conversation_ai.AI[0].answer);
        const content = [
          {
            content: conversation_user.HUMAN,
            title: 'HUMAN' + ' ' + conversation_user.time,
          },
          { content: conversation_ai.AI as string, title: 'AI' },
        ];
        const contents = HtmlContent(content);
        const rep = await asBlob(contents);
        saveAs(rep, `${conversation_title}.doc`);
      } else {
        const content = [
          {
            content: conversations[0].AI[0].answer,
            title: 'AI',
          },
        ];
        const contents = HtmlContent(content);
        const rep = await asBlob(contents);
        saveAs(rep, `${conversation_title}.doc`);
      }
    } else {
      const conversation = await dealAIres_conversations();
      const strs: HtmlString = conversation.map((conversation) => {
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
