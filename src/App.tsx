import './App.css';
import { useState, useEffect } from 'react';
import {AspectRatio, Autocomplete, Button, Card, CardActions, CardContent, CardCover, Stack, Typography, Tooltip, Grid, ToggleButtonGroup, IconButton} from '@mui/joy';
import { VisibilityOff, FavoriteBorder } from '@mui/icons-material'; //https://mui.com/material-ui/material-icons/

function App() {
  interface Merchant {
    name: string;
    multiplier: number;
    including?: string[];
  }

  interface Card {
    bank: string;
    name: string;
    network?: string;
    merchants: Merchant[];
    valueMultiplier: number;
    color?: string;
    firstLinkText?: string;
    firstLink?: string;
    secondLinkText?: string;
    secondLink?: string;
  }

  const categoryMap = new Map<string, string>();
  categoryMap.set('Hilton Hotels', 'Hotels');

  function getCategory(merchantName: string) {
    if (categoryMap.has(merchantName)) return categoryMap.get(merchantName);
    return merchantName;
  }


  const allCards: Card[] = [
    {
      bank: 'Chase',
      name: 'Freedom',
      merchants: [
        {
          name: 'Grocery',
          multiplier: 5,
        },
        {
          name: 'Fitness Club',
          multiplier: 5,
        },
        {
          name: 'Spa Service',
          multiplier: 5,
        },
      ],
      valueMultiplier: 2,
      color: 'cyan',
      secondLinkText: 'Activate 5% Calendar',
      secondLink: 'https://www.chasebonus.com/',
    },
    {
      bank: 'Chase',
      name: 'Ink Business Preferred',
      merchants: [
        {
          name: 'Travel',
          multiplier: 3,
          including: ['Airlines', 'Hotels', 'Cruise'],
        },
        {
          name: 'Shipping',
          multiplier: 3,
        },
        {
          name: 'Advertising',
          multiplier: 3,
        },
        {
          name: 'Internet-cable-phone',
          multiplier: 3,
        },
      ],
      valueMultiplier: 2,
      color: 'blue',
      firstLinkText: 'Apply',
      firstLink: 'https://www.milemoa.com/credit/ink-preferred/',
    },
    {
      bank: 'Chase',
      name: 'Marriott Bonvoy Boundless',
      merchants: [
        {
          name: 'Marriott Hotels',
          multiplier: 17,
        },
        {
          name: 'Grocery',
          multiplier: 3,
        },
        {
          name: 'Gas',
          multiplier: 3,
        },
        {
          name: 'Dining',
          multiplier: 3,
        },
      ],
      valueMultiplier: 0.5,
      color: 'navy',
    },
    {
      bank: 'AmEx',
      name: 'Gold',
      merchants: [
        { name: 'Dining', multiplier: 4 },
        { name: 'Grocery', multiplier: 4 },
        { name: 'Airlines', multiplier: 3 },
      ],
      valueMultiplier: 1.5,
      color: 'gold',
      firstLinkText: 'Apply',
      firstLink: 'https://www.milemoa.com/credit/amex-gold/',
    },
    {
      bank: 'AmEx',
      name: 'Hilton Surpass',
      merchants: [
        { name: 'Hilton Hotels', multiplier: 12 },
        { name: 'Dining', multiplier: 6 },
        { name: 'Grocery', multiplier: 6 },
        { name: 'Gas', multiplier: 6 },
      ],
      valueMultiplier: 1 / 3,
      color: 'Blue',
    },
    {
      bank: 'AmEx',
      name: 'Hilton',
      merchants: [
        { name: 'Hilton Hotels', multiplier: 7 },
        { name: 'Dining', multiplier: 5 },
        { name: 'Grocery', multiplier: 5 },
        { name: 'Gas', multiplier: 5 },
      ],
      valueMultiplier: 1 / 3,
      color: 'Blue',
    },
    {
      bank: 'Discover',
      name: 'Cashback',
      merchants: [
        { name: 'Restaurants', multiplier: 5 },
        { name: 'Drug Store', multiplier: 5 },
      ],
      valueMultiplier: 1,
      color: 'orange',
      secondLinkText: 'Activate 5% Calendar',
      secondLink:
        'https://www.discover.com/credit-cards/cash-back/cashback-calendar.html',
    },
  ];

  // eslint-disable-next-line prefer-const
  let options: string[] = [];
  allCards.forEach((card) => {
    card.merchants.forEach((merchant) => {
      if (options.indexOf(merchant.name) == -1) {
        options.push(merchant.name);
      }
      if (merchant.including && merchant.including.length > 0) {
        merchant.including.forEach((include) => {
          if (options.indexOf(include) == -1) {
            options.push(include);
          }
        });
      }
    });
  });
  options.sort();

  const [query, setQuery] = useState<string | null>('');
  const [cards, setCards] = useState(allCards);
  const [image, setImage] = useState('logo.jpg');

  useEffect(() => {
    if (query && query.length > 0) {
      setImage(getCategory(query) + '.jpg');
    } else {
      setImage('logo.jpg');
      setCards(allCards);
      return;
    }

    setCards([]);
    allCards.forEach((card) => {
      card.merchants.forEach((merchant) => {
        if (
          merchant.name == query ||
          (merchant.including && merchant.including.indexOf(query) > -1)
        ) {
          setCards((oldCards) => [...oldCards, card]);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const styles = {
    background: {
      backgroundImage: `url(${image})`,
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
    },

    gradient: {
      background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))',
      height: '100%',
    },

    content: {
      paddingTop: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.gradient}>
        <div style={styles.content}>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            <Grid>
              <Stack spacing={2}>
                <AspectRatio
                  sx={{ borderRadius: 'md', }}
                >
                  <img src={image} alt={image.split('.')[0]} />
                </AspectRatio>
                <Autocomplete
                  placeholder='Search'
                  options={options}
                  value={query}
                  onChange={(_, newValue) => {
                    setQuery(newValue);
                  }}
                  blurOnSelect={'touch'}
                />
              </Stack>
            </Grid>
            <Grid>
              <Stack spacing={1}>
                {cards.map((card) => (
                  <Card variant='outlined'>
                    <CardCover
                      sx={{
                        background: 'linear-gradient(160deg, white 50%, ' + card.color + ' 150%)',
                      }}
                    />
                    <CardContent>
                      <Typography level='title-lg'>
                        {card.bank} {card.name}
                      </Typography>
                      <Typography level='body-sm'>
                        {card.merchants.map((merchant) => (
                          <li>
                            {card.valueMultiplier != 1 && (
                              <Tooltip title={<span>
                                {merchant.multiplier}% * {card.valueMultiplier.toReadableDecimal()} cents
                                per points
                              </span>} variant="solid" size='sm'>
                                <Typography variant='soft' color='primary' >
                                  {(merchant.multiplier * card.valueMultiplier).toReadableDecimal()}%
                                </Typography>
                              </Tooltip>
                            )}
                            {card.valueMultiplier == 1 && (
                              <Typography variant='soft' color='primary' >
                                {(merchant.multiplier * card.valueMultiplier).toReadableDecimal()}%
                              </Typography>)}
                            {merchant.name}
                          </li>
                        ))}
                      </Typography>
                      <CardActions>
                        {false && // TODO
                          <ToggleButtonGroup>
                            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                              <FavoriteBorder />
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                              <VisibilityOff />
                            </IconButton>
                          </ToggleButtonGroup>
                        }
                        {card.firstLink && (
                          <Button
                            component='a'
                            variant='solid'
                            href={card.firstLink}
                            target='_blank'
                          >
                            {card.firstLinkText}
                          </Button>
                        )}
                        {card.secondLink && (
                          <Button
                            component='a'
                            variant='solid'
                            href={card.secondLink}
                            target='_blank'
                          >
                            {card.secondLinkText}
                          </Button>
                        )}

                      </CardActions>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;

/* TODO
Set start and end dates for promo
useLocalStorage
  - allow to hide card or pin card at top (always visible)
  - configure valueMultiplier
*/
