import './index.css';

import {
  ClockCircleOutlined,
  DeleteOutlined,
  FileWordOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';

import AiIdentity from './components/AiIdentity';
import Aside from './components/Aside';
import { useConversationStore } from './store';
const { TextArea } = Input;
function App() {
  const title = useConversationStore((state) => state.title);
  return (
    <div className="flex h-[100vh] flex-row bg-page-bg">
      <Aside />
      <div className="flex  w-[70vw] flex-col items-center justify-between">
        <div className="flex h-[8vh] w-[70vw] items-center justify-between border border-default-border pl-10 text-xl leading-[8vh]">
          <span className="self-start text-center">{title}</span>
          <div className="space-x-5 pr-5">
            <FileWordOutlined />
            <DeleteOutlined />
          </div>
        </div>
        <div className="mb-[20vh]">
          <AiIdentity></AiIdentity>
        </div>
        <div className=" w-[70vw] px-5 pb-8">
          <TextArea
            placeholder="Controlled autosize"
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
          <div className=" absolute bottom-8 right-8 space-x-4">
            <FullscreenOutlined />
            <ClockCircleOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
