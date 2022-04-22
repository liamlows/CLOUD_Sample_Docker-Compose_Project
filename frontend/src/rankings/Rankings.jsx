import './rankings.css';
import * as React from 'react';
import { TopUsers } from './TopUsers';
import { TopNfts } from './TopNfts';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export const Rankings = () => {
    return(<div className="rankingContainer">
        <h4 className="rankingHead">View the top Users or NFTs!</h4>
        <div class="row">
            <div class="col-6"><TopUsers/></div>
            <div class="col-6"><TopNfts/></div>
        </div>


    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            My Ranking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ranked *#* at *val*
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>);
}