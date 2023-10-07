import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import UpButton from 'src/icons/UpvoteButtonIcon.png'
import CommentIcon from 'src/icons/CommentIcon.png'
import UpvoteIcon from 'src/icons/UpvoteIcon.png'

const BoxContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    width: 1500px;
    height: 180px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const CustomBox = ({ issueName, issueDescription, issueStatus, upvoteCount, commentCount, date }) => {

    return (
        <BoxContainer>
        <h2>{issueName}</h2>
        <div style={{display:'flex', flexDirection:'row', gap:'120px'}}>
            <Typography sx={{width: '700px', // Set a fixed width for the description container
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    height: '39px',
                    fontSize: '14px'
                    }}>{issueDescription}</Typography>
            <Chip
              label={issueStatus}
              sx={{borderRadius:'17px', fontSize:'15px'}}
              color={
                issueStatus === "Open" ? "success" : issueStatus === "In progress" ? "primary" :"default"
              }
            />
            <p><img src={UpvoteIcon} style={{height: '20px', marginRight: '5px' }} />{upvoteCount}</p>
            <p><img src={CommentIcon} style={{height: '20px', marginRight: '5px' }} />{commentCount}</p>
            <Button variant="outlined" sx={{borderRadius:'17px', fontSize:'15px'}}>
                  <img src={UpButton} style={{height:'30px', marginLeft:'0px'}} />
                    Vote
            </Button>
        </div>
              
        <p>{date}</p>
        </BoxContainer>
    );
  };

export default CustomBox;
