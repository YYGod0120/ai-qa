import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

const buttons = [
  { title: '默认' },
  { title: '美景' },
  { title: '历史' },
  { title: '美食' },
];
export default function AiIdentity() {
  const [identityId, setIdentityId] = useState(0);
  const handleClick = (index: number) => {
    setIdentityId(index);
  };
  return (
    <div className="h-[250px]  w-[40vw] bg-default-bg ">
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
                handleClick(index);
              }}
              icon={<UserOutlined />}
            >
              {button.title}
            </Button>
          );
        })}
      </div>
      <Button size="large" className="mx-[15vw] w-[10vw]">
        确定
      </Button>
    </div>
  );
}
