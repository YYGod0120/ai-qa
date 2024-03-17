import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

import { getSessionGet, postSessionPost } from '@/service/session';
import { useConversationStore } from '@/store';
import { getCurrentTime } from '@/utils/time';

const buttons = [
  { title: '默认', categories: 'common' },
  { title: '景点', categories: 'attraction' },
  { title: '人文历史', categories: 'human' },
  { title: '美食', categories: 'food' },
  { title: '交通', categories: 'transport' },
  { title: '乡村旅游', categories: 'tour' },
  { title: '网红/热门', categories: 'hot' },
];
export default function AiIdentity({
  handleChooseIdentity,
  getData,
}: {
  handleChooseIdentity: React.Dispatch<React.SetStateAction<boolean>>;
  getData: any;
}) {
  const [identityId, setIdentityId] = useState(0);
  const setIdentity = useConversationStore((state) => state.setIdentity);
  const setId = useConversationStore((state) => state.setId);
  const editTitle = useConversationStore((state) => state.editTitle);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  return (
    <div className="height-[50%]  absolute left-[15%]  h-[250px] w-[40vw] translate-x-[50%] translate-y-[70%] bg-default-bg">
      <div className="space-x-3 pl-6 pt-5">
        <span className="text-lg">AI身份选择</span>
        <span className="text-sm">
          针对问题选择合适的AI，能获得更贴切的答案哦
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 px-8 py-4">
        {buttons.map((button, index) => {
          return (
            <Button
              disabled={index === identityId}
              size="large"
              key={index}
              onClick={() => {
                setIdentityId(index);
              }}
              icon={<UserOutlined />}
            >
              {button.title}
            </Button>
          );
        })}
      </div>
      <Button
        size="large"
        className="mx-[15vw] w-[10vw]"
        onClick={async () => {
          setIdentity(buttons[identityId].categories);
          const rep = await postSessionPost({
            category: buttons[identityId].categories,
          });

          if (rep.info === 'success') {
            const session = await getSessionGet();
            console.log(
              session.data.reverse().find((item) => {
                item.metadata.category === buttons[identityId].categories;
              })
            );

            setId(
              session.data.reverse().find((item) => {
                item.metadata.category === buttons[identityId].categories;
              }).session_id
            );
            editTitle(
              session.data.reverse().find((item) => {
                item.metadata.category === buttons[identityId].categories;
              }).metadata.title
            );
            setConversation([
              {
                AI: [
                  {
                    answer:
                      '您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色',
                  },
                ],
                time: getCurrentTime(),
              },
            ]);
            getData();
            console.log('over');
            handleChooseIdentity(true);
          }
        }}
      >
        确定
      </Button>
    </div>
  );
}
