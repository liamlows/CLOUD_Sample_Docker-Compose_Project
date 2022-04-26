import './HomePage.css';
import { Link } from 'react-router-dom';
import{useState,useEffect} from "react";
import { getNFTs } from '../api/NFTApi';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {HashRouter} from 'react-router-dom';
import {baseEndpoint} from '../urls/API';
import { NFTDetail } from './NFTDetail';

export const HomePage = () => {
    
    const[ NFTs, setNFTs ]=useState([]);
    useEffect(() => {
        getNFTs().then(x => setNFTs(x));
    }, [ ]);

    if(!NFTs){
        return<>Loading...</>
    }

    return (<div className="container my-4">
        <h1 className="header-align">Discover, collect, and sell extra ordinary NFTs</h1>
        <br></br>
            <div className="nft-container">
                <ImageList sx={{ width: 1000, height: 1000 }} cols={3} gap={20}>
                    {NFTs.map(NFT => <ImageListItem key={NFT.id}>
                        <Link to={`/NFT-details/${NFT.id}`} className="NFT">
                        <img className="card-img-top" src={NFT.image_url} alt="Card cap" ></img>
                        </Link>
                        {/* history.push(pathname:`/NFT-details/${NFT.id}`); */}
                        <Link to='/NFT-details' className="NFT">
                        <ImageListItemBar title={NFT.name} />
                        </Link>
                    </ImageListItem>)
                    }
                </ImageList>
            </div>
    </div>
    )

}
