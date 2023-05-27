import { ReactNode } from "react"
import { Upload, notification } from "antd"
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload"
import TimesIcon from "assets/icons/times.svg"

interface Props {
  onChange?: UploadProps["onChange"]
  setImgUrl?: (val: string) => void
  children?: ReactNode
}

export default function ImageUpload({ onChange, setImgUrl, children }: Props) {
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      notification.open({
        message: "Можно загружать только изображения в формает JPG/PNG",
        closeIcon: <TimesIcon />,
      })
    }
    return isJpgOrPng
  }

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      onChange?.(info)
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImgUrl?.(url)
      })
    }
  }

  return (
    <Upload
      maxCount={1}
      showUploadList={false}
      accept=".jpg,.jpeg,.png"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {children}
    </Upload>
  )
}
