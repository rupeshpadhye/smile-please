import React, {useState} from 'react';
import { isEmpty } from 'lodash';
import Lightbox from "react-image-lightbox";
import Tooltip from '@material-ui/core/Tooltip';
import {WhatsappShareButton} from "react-share";
import WhatsApp from '@material-ui/icons/WhatsApp';
import styled from 'styled-components';
import "react-image-lightbox/style.css";
import { Image } from '../background/store/images';



const ImageTitleBox= styled('div')`
    display: flex;
    flex-direction: row;
    font-size: small;
    font-weight: bold;
`;

const ShareButtons = styled('div')`
    position: absolute; 
    right: 4em;
    top: 0.5em;
`;

interface ImageProps {
    image: Image;
}

interface ImageListProps {
    images: Image[];
    markAsViewed: (image: Image) => void
}



const ImageTitle: React.FC<ImageProps> = ({image}: ImageProps) => {
    return (
         <ImageTitleBox>
            <div dangerouslySetInnerHTML={{__html: image.title}}>
            </div>
            <ShareIcon image={image}/>
         </ImageTitleBox>
    )
}

const ShareIcon: React.FC<ImageProps> = ({image}: ImageProps) => {
    return (
        <ShareButtons>

        <WhatsappShareButton
            url={image.link}
            title={image.title}
            separator="::">
            <Tooltip title="Share this on WhatsApp">
                 <WhatsApp />
            </Tooltip>    
        </WhatsappShareButton>
    </ShareButtons>
    )
}


const ImageList: React.FC<ImageListProps> =  (props: ImageListProps ) => {
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const { images } = props;
    if(isEmpty(images)) {
        return null;
    }
    const links = images.map(i => i.link);
    const titles = images.map(i => <ImageTitle image={i}/>);
    return (
        <Lightbox  
        mainSrc={links[photoIndex]}
        nextSrc={links[(photoIndex + 1) % images.length]}
        prevSrc={links[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={()=>{}}
        onMovePrevRequest={() => {
            props.markAsViewed(images[photoIndex]); 
            setPhotoIndex((photoIndex + images.length - 1) % images.length)}
        }
        onMoveNextRequest={() => { 
            props.markAsViewed(images[photoIndex]);
            setPhotoIndex((photoIndex + 1) % images.length) 
        }}
        imageTitle={titles[photoIndex]}
        clickOutsideToClose={false}
        enableZoom={false}
        />
    );
}
 
export default ImageList;