import { Button, Form, Input } from 'antd-mobile';
import { useState } from 'react';

import loginBG from '@/assets/login_bg.jpg';
import { CountNumber } from '@/components/CountNumber';
import { IconFont } from '@/components/IconFont';
import { PageWrapper } from '@/components/PageWrapper';
import { requestSendSMS, requestSMSLogin } from '@/services/user';
import { toAdaptedPx } from '@/utils';
import { Rule } from '@/utils/formRules';
import { setAuthToken } from '@/utils/storage';

import styles from './style.module.less';

export default function LoginPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const query = new URLSearchParams(location.search);

  const onSubmit = (values: any) => {
    setSubmitting(true);
    requestSMSLogin({ ...values, sign: true })
      .then(({ data }) => {
        setAuthToken(data.token);
        setSubmitting(false);

        let from = query.get('from_page');
        if (from) location.href = decodeURIComponent(from);
        else location.href = '/';
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <PageWrapper navbar={{ children: '登录' }}>
      <div className={styles.loginPage} style={{ backgroundImage: `url("${loginBG}")` }}>
        <div className={styles.container} key="login">
          <div className={styles.name}>某个H5系统</div>
          <Form
            requiredMarkStyle="none"
            form={form}
            onFinish={onSubmit}
            layout="horizontal">
            <Form.Item
              name="mobile"
              label={formLabel('icon-phone', '手机号')}
              rules={[Rule.inputRequired(), Rule.phoneNumber()]}>
              <Input maxLength={11} placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入' },
                { pattern: /^\d{6}$/, message: '验证码不正确' },
              ]}
              label={formLabel('icon-yanzhengma', '验证码')}
              extra={
                <CountNumber
                  title="获取验证码"
                  from={60}
                  to={0}
                  shouldStart={() => {
                    return new Promise((resolve) => {
                      form
                        .validateFields(['mobile'])
                        .then(() => {
                          requestSendSMS({ mobile: form.getFieldValue('mobile') })
                            .then(() => resolve(true))
                            .catch(() => resolve(false));
                        })
                        .catch(() => resolve(false));
                    });
                  }}
                />
              }>
              <Input maxLength={6} placeholder="请输入" />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                color="primary"
                fill="solid"
                size="large"
                type="submit"
                loading={submitting}
                style={{ width: '100%', marginTop: toAdaptedPx(26) }}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.bottomLine}>
            <div>@Copyright xxx公司</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function formLabel(icon: string, title: string) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconFont
        type={icon}
        style={{
          fontSize: toAdaptedPx(22),
          marginRight: toAdaptedPx(8),
        }}
      />
      <span>{title}</span>
    </div>
  );
}
