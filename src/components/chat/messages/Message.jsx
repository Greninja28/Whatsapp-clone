import { Box, Typography, styled } from "@mui/material"
import { downloadMedia, formatDate } from "../../../utils/commonUtils"
import { useContext } from "react"
import { AccountContext } from "../../../context/AccountProvider"
import GetAppIcon from '@mui/icons-material/GetApp';
import { iconPDF } from "../../../constants/data";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  word-break: break-word;
  margin-top: 5px;
`
const Wrapper = styled(Box)`
  background: #fff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  word-break: break-word;
  margin-top: 5px;
`
const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`
const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`
const DownloadIcon = styled(GetAppIcon)`
  margin-right: 10px;
  border: 1px solid grey;
  border-radius: 50%;
`

const Message = ({ message }) => {

  const { account } = useContext(AccountContext)

  return (
    <>
      {
        account.sub === message.senderId ?
          <Own>
            {
              message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
            }

          </Own>
          :
          <Wrapper>
            {
              message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
            }
          </Wrapper>
      }
    </>
  )
}

const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  )
}
const ImageMessage = ({ message }) => {
  return (
    <>
      <Box style={{ position: 'relative' }}>
        {
          message?.text?.includes('.pdf') ?
            <Box style={{ display: 'flex' }}>
              <img src={iconPDF} alt="" style={{ width: 80 }} />
              <Typography style={{ fontSize: '14px' }}>{message.text.split('/').pop()}</Typography>
            </Box>
            :
            <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />

        }
        <Time style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <DownloadIcon fontSize="small" onClick={(e) => downloadMedia(e, message.text)} />
          {formatDate(message.createdAt)}
        </Time>
      </Box>
    </>
  )
}

export default Message