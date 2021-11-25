import React, { useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import useStyles from './styles.js';

export default function NewsCard({ article : { description, publishedAt, source, title, url, urlToImage},activeArticle, i }){
    const classes = useStyles();

    const [ elRefs, setElRefs ] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, []);

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs]);

    return(
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://www.google.com/search?q=news+images&tbm=isch&source=iu&ictx=1&fir=6v1jo9aeSI8WTM%252ClnOQy7aptQ0EHM%252C_&vet=1&usg=AI4_-kQyCxyjTuEdvXTILrvPEHqvUUylow&sa=X&ved=2ahUKEwidkq7nxMHyAhXVdn0KHRhBAO8Q9QF6BAgUEAE#imgrc=6v1jo9aeSI8WTM'} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button sze="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}