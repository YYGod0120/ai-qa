import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

import { postLoginPost } from '@/service/user';

export function Login() {
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem('refresh_token') === null
  );
  const onFinish = async (values: { username: string; password: string }) => {
    const { username, password } = values;
    const data = await postLoginPost({
      username: username,
      password: password,
    });
    if (data.status === 0) {
      localStorage.setItem('user_id', data.data.user_id);
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Modal title="请先登录" open={isModalOpen} footer={null} closeIcon={null}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button mr-10"
            >
              登录
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              注册！
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
