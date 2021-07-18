import React, {useState} from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media,Carousel,CarouselItem,CarouselCaption,CarouselControl,CarouselIndicators } from 'reactstrap';
import { Link } from 'react-router-dom';


// function RenderLeader({ leaders }) {
//     return (
//         <div>
//             {leaders.map((leader) => {

//                 return (
//                     <Media key={leader.id}>
//                         <Media className="mr-5">
//                             <Media object data src={leader.image} alt="Alberto.png" />
//                         </Media>
//                         <Media body>
//                             <Media heading><p>{leader.name}</p></Media>
//                             <Media h2><p>{leader.designation}</p></Media>
//                             <p>{leader.description}</p>
//                         </Media>
//                     </Media>
//                 );
//             })}


//         </div>
//     );
// }
const items = [
    {
      src: "./assets/images/breads.jpg",
      altText: 'Whole Range of Assorted Breads!',
      caption: 'At Charcuterie we have a whole range of assorted breads combo for all the bread lovers out there! This assorted basket of bread comes with a loaf each of sourdough, parmesan garlic, wholewheat grain, stuffed cheese and garlic breads!'
    },
    {
      src: "./assets/images/platter.jpg",
      altText: 'Cheese Platter!',
      caption: 'Chef’s Choice selection of cheeses & charcuterie with fig preserves, cream of balsamic, olives, housemade balsamic candied walnuts, honey & cornichons. Served with rustic crackers and Krema housemade crusty French baguette.'
    },
    {
      src: "./assets/images/wine and cheese combo.jpg",
      altText: 'Wine and Cheese Combo!',
      caption: 'Wine and Cheese Combo!'
    }
  ];
const MenuItems = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img className="carousel-image" src={item.src} alt={item.altText} />
          <CarouselCaption className="col-6 align-carousal ml-auto mr-auto col-jumbotron" captionText={item.caption} captionHeader={item.altText} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
}
  

function About(props) {

    const leaders = props.leaders.map((leader) => {
        return (
            <p>Leader {leader.name}</p>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h4>Cheeses, Wines and Breads</h4>
                    <p>A fine wine and artisan cheese shop, wine bar and cafe located in historic downtown Whitefield, featuring artisanal cheese and charcuterié, smaller production wines, craft beer and cocktails, gourmet cafe menu and wine tastings available to order anytime.</p>
                    <p>Charcuterié is your destination wine shop to sip, nibble and enjoy in downtown Whitefield. Stop in to browse our diverse selection of boutique wines and assorted cheeses, stay for a meal with friends and make sure to bring your favorites home to share.</p>
                </div>
                <div className="col-12 col-md-6">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">4 June, 2021</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">SAPA</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">Rs. 1.25 Crores</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Who said I was drinking alone?!? ...I had Wine AND Cheese.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                    <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                        P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Our carousal</h2>
                </div>
                {/* <div className="col-12">
                    <Media list>
                        <RenderLeader leaders={props.leaders} />
                    </Media>
                </div> */}
                <div className="col-12">
                    <MenuItems />
                </div>
            </div>
        </div>
    );
}

export default About;