import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../context/contextCreate';

import { Form, Input, Popover } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

type validateStatus = "" | "success" | "warning" | "error" | "validating" | undefined;
type fieldSize = "small" | "middle" | "large";

interface ThisProps {
  help?: string,
  size?: fieldSize,
  noStyle?: boolean,
  requiredMark?: boolean,
  withConfirmPassword?: boolean,
  required?: boolean | undefined,
  validateStatus?: validateStatus,
  useStrictPassword?: boolean,
};

const passwordValidationInfo = [
  {
    language: "id",
    info: [
      {
        id: 0,
        desc: "Harus berisi angka.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 1,
        desc: "Minimal ada 8 karakter.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 2,
        desc: "Harus mengandung huruf kecil.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 3,
        desc: "Harus mengandung huruf besar.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      }
    ]
  },
  {
    language: "en",
    info: [
      {
        id: 0,
        desc: "Must contain a number.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 1,
        desc: "Must at least 8 Characters.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 2,
        desc: "Must contain a lower case letter.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      },
      {
        id: 3,
        desc: "Must contain a upper case letter.",
        invalidIcon: <CloseCircleOutlined />,
        validIcon: <CheckCircleOutlined />,
        invalidColor: '#e11d48',
        validColor: '#16a34a',
      }
    ]
  }
];

export const PasswordForm: React.FC<ThisProps> = ({
  help,
  requiredMark,
  validateStatus,
  size = "middle",
  noStyle = false,
  required = true,
  withConfirmPassword,
  useStrictPassword = true,
}) => {
  const form = Form.useFormInstance();
  const passwordUseWatch = Form.useWatch("password", form);
  const { language } = useContext(GlobalContext);

  const [isInputFocus, setIsInputFocus] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const renderValidationInfo = useMemo(() => {
    const validationInfo = passwordValidationInfo.find((item) => item.language === language)?.info;

    const numbers = /[0-9]/g;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const validationResults = [
      {
        id: 0,
        isValid: passwordUseWatch?.match(numbers)
      },
      {
        id: 1,
        isValid: passwordUseWatch?.length >= 8
      },
      {
        id: 2,
        isValid: passwordUseWatch?.match(lowerCaseLetters)
      },
      {
        id: 3,
        isValid: passwordUseWatch?.match(upperCaseLetters)
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {
          validationInfo?.map((info) => (
            <div
              key={info.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: validationResults.find((item) => item.id === info.id)?.isValid ? info.validColor : info.invalidColor,
                gap: 6,
              }}
            >
              {validationResults.find((item) => item.id === info.id)?.isValid ? info.validIcon : info.invalidIcon}
              <span style={{ color: validationResults.find((item) => item.id === info.id)?.isValid ? info.validColor : info.invalidColor, }}>{info.desc}</span>
            </div>
          ))
        }
      </div>
    )
  }, [passwordUseWatch]);

  const isStrictPasswordValid = useMemo(() => {
    if (!useStrictPassword) return;

    const numbers = /[0-9]/g;
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const validationResults = [
      {
        id: 0,
        isValid: passwordUseWatch?.match(numbers)?.length > 0
      },
      {
        id: 1,
        isValid: passwordUseWatch?.length >= 8
      },
      {
        id: 2,
        isValid: passwordUseWatch?.match(lowerCaseLetters)?.length > 0
      },
      {
        id: 3,
        isValid: passwordUseWatch?.match(upperCaseLetters)?.length > 0
      }
    ];

    return validationResults.every(item => item.isValid);
  }, [useStrictPassword, passwordUseWatch]);

  useEffect(() => {
    if (useStrictPassword === false) return;

    if (isInputFocus === false && useStrictPassword && isStrictPasswordValid === false) return setOpenPopover(false);
    if (isInputFocus === true && useStrictPassword && isStrictPasswordValid === false) return setOpenPopover(true);
    if (isInputFocus === true && useStrictPassword && isStrictPasswordValid === true) return setOpenPopover(false);
  }, [isInputFocus, useStrictPassword, isStrictPasswordValid]);

  return (
    <>
      <Form.Item
        help={help}
        hasFeedback
        name="password"
        label="Password"
        noStyle={noStyle}
        required={requiredMark}
        validateStatus={validateStatus}
        rules={[
          {
            required: true,
            message: language === "en" ? 'Password still empty!' : "Password masih kosong",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (useStrictPassword === false) {
                if (!value || getFieldValue('password') === value && value.length >= 8) return Promise.resolve();
                else return Promise.reject(language === "en" ? "Password must contain 8 characters" : "Password wajib 8 karakter");
              }
              else {
                const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
                const isValidPassword = pattern.test(value);
                if (!value || getFieldValue('password') === value && isValidPassword === true) {
                  return Promise.resolve();
                }
                if (isValidPassword === false) return Promise.reject(new Error('Not a valid password!'));
              }
            }
          })
        ]}
      >
        <div>
          <Input.Password
            size={size}
            placeholder="Input Password"
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
          />
          <Popover open={openPopover} content={renderValidationInfo} placement='bottomRight' />
        </div>
      </Form.Item>

      {
        withConfirmPassword === true &&
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          required={requiredMark}
          hasFeedback
          rules={[
            {
              required: required,
              message: 'Password confirmation still empty!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password did not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            size={size}
            placeholder="Retype Password"
          />
        </Form.Item>
      }
    </>
  );
};