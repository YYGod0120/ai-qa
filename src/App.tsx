import './index.css';
import './styles/shadow.css';

import clear from './aside_icon/clean_con.png';
import export_word from './aside_icon/export_word.png';
import full_scene from './aside_icon/full_scene.png';
import history from './aside_icon/history.png';
import AI from './components/AI';
// import AiIdentity from './components/AiIdentity';
import Aside from './components/Aside';
import FQ from './components/FQ';
import USER from './components/USER';
import { useConversationStore } from './store';

function App() {
  const title = useConversationStore((state) => state.title);
  return (
    <div className="flex h-[100vh] flex-row bg-page-bg  ">
      <Aside />
      <div className="box-shadow  mb-[1vh] mt-[3vh] flex w-[70vw] flex-col items-center justify-between rounded-2xl bg-white">
        <div className="h-[80vh]">
          <div className="flex  w-[70vw] items-center justify-between rounded-t-2xl border-b-2 border-main-divider bg-gradient-to-r from-[#F6F9FE] via-transparent to-[#FFFFFF] pl-10 text-xl leading-[8vh]">
            <span className="self-start text-center text-default-font">
              {title}
            </span>
            <div className="flex space-x-5 pr-5">
              <img src={export_word} alt="导出为word" title="导出为word" />
              <img src={clear} alt="清除对话" title="清除对话" />
            </div>
          </div>

          <div className="scrollbar ml-5 mt-5 h-[70vh] space-y-7 overflow-y-scroll">
            <AI>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
              <FQ></FQ>
            </AI>
            <USER>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
            </USER>
            <USER>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
            </USER>
            <USER>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
            </USER>
            <USER>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
            </USER>
            <AI>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
              <FQ></FQ>
            </AI>
            <AI>
              <span>
                您好!您可以问我任何有关于重庆的文旅信息，如历史、名人、景点、饮食特色
              </span>
              <FQ></FQ>
            </AI>
          </div>
        </div>
        <div className=" relative  mb-8 w-[70vw] px-5">
          <input
            className="text-input-shadow h-[59px] w-[68vw] rounded-md px-4 py-2  text-base outline-none"
            placeholder="请问我任何关于重庆文旅的问题"
          ></input>

          <div className=" absolute bottom-[50%] right-8  flex  translate-y-[50%] space-x-4">
            <img src={history} alt="历史记录" title="历史记录" />
            <img src={full_scene} alt="全屏" title="全屏" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
