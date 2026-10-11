import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowLeft, BadgeCheck, ChefHat, ChevronDown,
  Clock3, Mail, MapPin, Menu as MenuIcon, Minus, Plus, Search,
  ShoppingBag, Sparkles, X, Heart, Leaf, Utensils, MoveUpRight, MessageCircle, Sun, Moon
} from 'lucide-react';
import './styles.css';

const EMAIL = 'zaikaaddaofficial@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/zaikaaddaofficial/';
const FACEBOOK = 'https://www.facebook.com/zaikaadddaofficial';
const WHATSAPP_NUMBER = '919336740942';
const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const products = [
  { id: 1, name: 'Chicken Shawarma Roll', category: 'Rolls', type: 'nonveg', description: 'A flavour-packed roll for your savoury cravings.', image: '/images/shawarma-roll.webp', imagePosition: 'center' },
  { id: 2, name: 'Egg Roll', category: 'Rolls', type: 'egg', description: 'A satisfying classic, wrapped and ready to enjoy.', image: '/images/egg-roll.webp', imagePosition: 'center' },
  { id: 3, name: 'Veg Burger', category: 'Burgers', type: 'veg', description: 'A hearty burger stacked with flavour and crunch.', image: '/images/burger-fries.webp', imagePosition: 'center' },
  { id: 4, name: 'Masala Garlic Maggi', category: 'Maggi', type: 'veg', description: 'Comforting noodles with a bold masala mood.', image: '/images/masala-garlic-maggi.webp', imagePosition: 'center' },
  { id: 5, name: 'Cakes & Pastries', category: 'Desserts', type: 'veg', description: 'A sweet finish for your little celebrations.', image: '/images/cakes-pastries.webp', imagePosition: 'center' },
  { id: 6, name: 'Nuggets & Fries', category: 'Snacks', type: 'nonveg', description: 'Crunchy bites and golden fries for snack time.', image: '/images/snacks-fries-nuggets.webp', imagePosition: 'center' },
];

const categories = ['All Items', 'Rolls', 'Burgers', 'Maggi', 'Snacks', 'Desserts'];
const reveal = { hidden: { opacity: 0, y: 30, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .09 } } };

function WhatsAppIcon({ size = 18, className = "" }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.96L.12 24l6.32-1.66a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.42ZM12.1 21.77h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.66-.24-.38a9.85 9.85 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.62.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>;
}
function InstagramBrandIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#ffd776"/><stop offset=".48" stopColor="#f56040"/><stop offset="1" stopColor="#bc2a8d"/></linearGradient></defs><rect x="1" y="1" width="22" height="22" rx="6" fill="url(#ig-gradient)"/><rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" fill="none" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="3.25" fill="none" stroke="white" strokeWidth="1.8"/><circle cx="17.1" cy="6.9" r="1.05" fill="white"/></svg>;
}
function FacebookBrandIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="white" d="M13.7 21v-8.2h2.75l.41-3.2H13.7V7.56c0-.93.26-1.56 1.59-1.56H17V3.14c-.3-.04-1.34-.14-2.55-.14-2.52 0-4.25 1.54-4.25 4.37V9.6H7.35v3.2h2.85V21h3.5Z"/></svg>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPageCount, setCarouselPageCount] = useState(1);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const visibleProducts = useMemo(() => products.filter(p =>
    (activeCategory === 'All Items' || p.category === activeCategory) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [activeCategory, search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getCarouselStep = useCallback(() => {
    const viewport = carouselRef.current;
    const card = viewport?.querySelector('.product-card');
    if (!viewport || !card) return 0;
    const styles = window.getComputedStyle(viewport);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const getCarouselMaxIndex = useCallback(() => {
    const viewport = carouselRef.current;
    const step = getCarouselStep();
    if (!viewport || !step) return 0;
    return Math.max(0, Math.ceil((viewport.scrollWidth - viewport.clientWidth - 2) / step));
  }, [getCarouselStep]);

  const moveCarousel = useCallback((direction) => {
    const viewport = carouselRef.current;
    const step = getCarouselStep();
    if (!viewport || !step) return;
    const maxIndex = getCarouselMaxIndex();
    let next = carouselIndex + direction;
    if (next > maxIndex) next = 0;
    if (next < 0) next = maxIndex;
    setCarouselIndex(next);
    viewport.scrollTo({ left: next * step, behavior: 'smooth' });
  }, [carouselIndex, getCarouselMaxIndex, getCarouselStep]);

  useEffect(() => {
    setCarouselIndex(0);
    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeCategory, search]);

  useEffect(() => {
    const measurePages = () => {
      const maxIndex = getCarouselMaxIndex();
      setCarouselPageCount(maxIndex + 1);
      setCarouselIndex(current => Math.min(current, maxIndex));
    };
    const frame = window.requestAnimationFrame(measurePages);
    window.addEventListener('resize', measurePages);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', measurePages); };
  }, [getCarouselMaxIndex, visibleProducts]);

  useEffect(() => {
    if (carouselPaused || visibleProducts.length < 2 || carouselPageCount < 2) return;
    const timer = window.setInterval(() => moveCarousel(1), 4200);
    return () => window.clearInterval(timer);
  }, [carouselPaused, carouselPageCount, moveCarousel, visibleProducts.length]);

  const syncCarouselIndex = () => {
    const step = getCarouselStep();
    if (step && carouselRef.current) setCarouselIndex(Math.min(getCarouselMaxIndex(), Math.round(carouselRef.current.scrollLeft / step)));
  };

  const addToCart = (product) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQuantity = (id, delta) => setCart(current => current.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderOnWhatsApp = () => {
    const message = [
      'Hello ZaikaAdda,',
      '',
      'I would like to place an order:',
      ...cart.map((item, index) => `${index + 1}. ${item.name} x ${item.quantity}`),
      '',
      'Please confirm current prices, availability and delivery options in Barabanki.',
      '',
      'Name:',
      'Delivery address:',
      '',
      'Har Bite Mein Zaika!'
    ].join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };
  const quickWhatsApp = () => window.open(whatsappUrl('Hello ZaikaAdda, I would like to know your menu, current prices and delivery options in Barabanki.'), '_blank', 'noopener,noreferrer');
  const closeMobile = () => setMobileMenu(false);

  return <div className={`site-shell theme-${theme}`}>
    <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
    <div className="announcement"><Sparkles size={13}/><span>YOUR LOCAL FOOD ADDA</span><i/> <span>BARABANKI, UTTAR PRADESH</span><i/><span>HAR BITE MEIN ZAIKA!</span></div>
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="ZaikaAdda home" onClick={closeMobile}>
        <img src="/images/brand-logo.webp" alt="ZaikaAdda logo"/>
        <span className="brand-copy"><strong className="brand-name-animated">Z<span className="brand-chef-cap" aria-hidden="true"><ChefHat size={17}/></span>aika<span>Adda</span><i className="brand-food-spark">✦</i></strong><small>HAR BITE MEIN ZAIKA!</small></span>
      </a>
      <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Main navigation">
        <a href="#home" onClick={closeMobile}>Home</a><a href="#menu" onClick={closeMobile}>Menu</a><a href="#story" onClick={closeMobile}>Our Story</a><a href="#why-us" onClick={closeMobile}>The Zaika Promise</a><a href="#contact" onClick={closeMobile}>Contact</a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={()=>setTheme(t=>t==='light'?'dark':'light')} aria-label={theme==='light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme==='light' ? 'Dark mode' : 'Light mode'}>{theme==='light'?<Moon size={16}/>:<Sun size={16}/>}</button>
        <button className={`cart-button ${itemCount>0 ? 'has-picks' : ''}`} onClick={()=>setCartOpen(true)} aria-label={`Open order list, ${itemCount} items`}><ShoppingBag size={17}/><span>My Picks</span>{itemCount>0&&<b>{itemCount}</b>}</button>
        <a className="button button-small button-dark" href="#menu">Explore Menu <ArrowRight size={14}/></a>
      </div>
      <button className="mobile-toggle" aria-label={mobileMenu?'Close menu':'Open menu'} onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X/>:<MenuIcon/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} transition={{duration:.6}}><span className="eyebrow-line"/><span>THE ART OF EVERYDAY CRAVINGS</span></motion.div>
          <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.8,ease:[.22,1,.36,1]}}>A little more<br/><span className="heading-accent">flavour.</span><br/>A lot more <em>adda.</em></motion.h1>
          <motion.p className="hero-hindi" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.38}}>हर Bite में Zaika!</motion.p>
          <motion.p className="hero-description" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.42,duration:.65}}>From flavour-packed rolls to comfort-food favourites and sweet treats — your next happy bite has a home at ZaikaAdda.</motion.p>
          <motion.div className="hero-buttons" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.52}}>
            <a href="#menu" className="button button-gold">Explore the menu <ArrowRight size={16}/></a><a href="#story" className="button button-quiet">Our little story <ArrowDownRight size={16}/></a>
          </motion.div>
          <motion.div className="hero-proof" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.72}}>
            <span className="proof-icon"><ChefHat size={18}/></span><span><strong>Made with care</strong><small>Flavour in every bite</small></span><i/><span className="proof-icon"><Heart size={17}/></span><span><strong>Made for cravings</strong><small>Your favourites, one adda</small></span>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:'easeOut'}}>
          <motion.div className="hero-image-frame hero-food-frame" animate={{y:[0,-7,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}}><div className="food-glow"/><div className="steam steam-one"/><div className="steam steam-two"/><div className="steam steam-three"/><img className="hero-food" src="/images/burger-fries.webp" alt="ZaikaAdda-style burger with golden fries"/></motion.div>
          <motion.div className="hero-sticker" animate={{rotate:[-8,-4,-8],y:[0,-4,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}><span>GOOD FOOD</span><strong>GOOD<br/>MOOD</strong><span>✦ ALWAYS ✦</span></motion.div>
          <motion.div className="hero-note" initial={{opacity:0,x:15,rotate:8}} animate={{opacity:1,x:0,rotate:4}} transition={{delay:.6,duration:.6}}><span className="note-star">✳</span><span>Cravings? <b>Sorted.</b><br/>Mood? <b>Lifted.</b></span></motion.div>
          <div className="hero-image-caption"><span className="caption-dot"/><span>Made for your kind of craving</span></div>
          <span className="hero-index">01 <i/> THE ZAIKA EDIT</span>
        </motion.div>
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      </section>

      <section className="marquee-band"><div className="marquee-track">{Array.from({length:2}).map((_,i)=><span key={i}>GOOD FOOD <b>✳</b> GOOD MOOD <b>✳</b> HAR BITE MEIN ZAIKA <b>✳</b> CRAVINGS KA PERFECT ADDA <b>✳</b></span>)}</div></section>

      <section className="categories section-wrap" aria-labelledby="category-title">
        <motion.div className="section-heading centered" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}}>
          <span className="eyebrow"><span className="eyebrow-line"/> WHAT ARE WE CRAVING TODAY?</span><h2 id="category-title">Choose your <span className="heading-accent">mood.</span></h2><p>One adda. Many cravings. Find the flavour that feels like you.</p>
        </motion.div>
        <motion.div className="category-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,amount:.15}}>
          {[{name:'Rolls',subtitle:'Wrapped with flavour',icon:'🌯',category:'Rolls'},{name:'Burgers',subtitle:'Stacked to satisfy',icon:'🍔',category:'Burgers'},{name:'Maggi',subtitle:'Comfort in a bowl',icon:'🍜',category:'Maggi'},{name:'Snacks',subtitle:'Crunch-time favourites',icon:'🍟',category:'Snacks'},{name:'Sweet Treats',subtitle:'A sweet little finish',icon:'🍰',category:'Desserts'}].map(item=><motion.button variants={reveal} whileHover={{y:-7,scale:1.015}} whileTap={{scale:.98}} key={item.name} className="category-card" onClick={()=>{setActiveCategory(item.category);document.getElementById('menu')?.scrollIntoView({behavior:'smooth'});}}><span className="category-emoji">{item.icon}</span><strong>{item.name}</strong><small>{item.subtitle}</small><span className="category-arrow"><ArrowUpRightIcon/></span></motion.button>)}
        </motion.div>
      </section>

      <section className="menu-section" id="menu"><div className="section-wrap menu-inner">
        <motion.div className="menu-heading-row" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}>
          <div className="section-heading"><span className="eyebrow"><span className="eyebrow-line"/> THE MENU, THE MOOD</span><h2>Crave it. <span className="heading-accent">Find it.</span></h2><p>A little something for every appetite. Prices are confirmed directly with us.</p></div>
          <label className="menu-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find your craving..." aria-label="Search menu"/><span>⌘ K</span></label>
        </motion.div>
        <div className="filter-row" role="group" aria-label="Filter menu by category">{categories.map(cat=><button key={cat} className={`filter-pill ${activeCategory===cat?'active':''}`} onClick={()=>setActiveCategory(cat)}>{cat}</button>)}</div>
        <div className="menu-carousel-shell" onMouseEnter={()=>setCarouselPaused(true)} onMouseLeave={()=>setCarouselPaused(false)} onFocusCapture={()=>setCarouselPaused(true)} onBlurCapture={()=>setCarouselPaused(false)}>
          <div className="carousel-controls"><span className="carousel-counter"><b>{String(Math.min(carouselIndex + 1, Math.max(visibleProducts.length, 1))).padStart(2,'0')}</b> / {String(visibleProducts.length).padStart(2,'0')}</span><div className="carousel-arrows"><button onClick={()=>moveCarousel(-1)} aria-label="Previous menu item" disabled={visibleProducts.length<2}><ArrowLeft size={17}/></button><button onClick={()=>moveCarousel(1)} aria-label="Next menu item" disabled={visibleProducts.length<2}><ArrowRight size={17}/></button></div></div>
          <motion.div className="product-carousel-viewport" ref={carouselRef} onScroll={syncCarouselIndex} layout>
            <AnimatePresence mode="popLayout">{visibleProducts.map((product,i)=><motion.article className="product-card" key={product.id} layout initial={{opacity:0,y:24,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.42,delay:i*.045}}>
              <div className="product-image-wrap"><img src={product.image} alt={product.name} style={{objectPosition:product.imagePosition}} loading="lazy"/><span className={`food-mark ${product.type}`}><i/>{product.type==='veg'?'VEG':product.type==='egg'?'EGG':'NON-VEG'}</span><motion.button whileHover={{scale:1.1,rotate:90}} whileTap={{scale:.9}} className="quick-add" onClick={()=>addToCart(product)} aria-label={`Add ${product.name} to picks`}><Plus size={18}/></motion.button><span className="image-overlay-label">ZAIKA FAVOURITE</span><span className="food-image-shine"/></div>
              <div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="price-soon">Price on enquiry</span></div><h3>{product.name}</h3><p>{product.description}</p><button className="product-add" onClick={()=>addToCart(product)}>Add to My Picks <ArrowRight size={15}/></button></div>
            </motion.article>)}</AnimatePresence>
            {visibleProducts.length===0&&<div className="empty-state"><Search size={28}/><h3>No cravings found</h3><p>Try another search or category.</p><button className="button button-dark" onClick={()=>{setSearch('');setActiveCategory('All Items')}}>Show all items</button></div>}
          </motion.div>
          {carouselPageCount>1&&<div className="carousel-dots" aria-label="Menu carousel position">{Array.from({length:carouselPageCount},(_,i)=><button key={i} aria-label={`Go to menu carousel page ${i+1}`} className={i===carouselIndex?'active':''} onClick={()=>{const step=getCarouselStep();setCarouselIndex(i);carouselRef.current?.scrollTo({left:i*step,behavior:'smooth'});}} />)}</div>}
        </div>
        <p className="menu-note"><Sparkles size={14}/> Swipe, explore and pick your cravings. Prices and availability are confirmed on WhatsApp.</p>
      </div></section>

      <section className="story section-wrap" id="story">
        <motion.div className="story-image" initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}} transition={{duration:.7}}><img src="/images/zaikaadda-poster-cream.webp" alt="ZaikaAdda brand artwork featuring menu favourites" loading="lazy"/><div className="story-image-badge"><span>OUR LITTLE</span><strong>FOOD<br/>UNIVERSE</strong><span>✦ FULL OF FLAVOUR ✦</span></div></motion.div>
        <motion.div className="story-copy" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}>
          <span className="eyebrow"><span className="eyebrow-line"/> A LITTLE ABOUT OUR ADDA</span><h2>Food is the plan.<br/><span className="heading-accent">Joy is the extra.</span></h2>
          <p>ZaikaAdda is being built around one simple idea: everyday cravings deserve a little extra love. From rolls and burgers to comforting Maggi, crunchy snacks and sweet treats, we’re bringing different favourites together under one roof.</p><p>Rooted in Barabanki, Uttar Pradesh, ZaikaAdda is here to make choosing your next bite feel easy, joyful and full of flavour.</p>
          <div className="story-points"><div><span><Leaf size={17}/></span><b>Flavour-first</b><small>Food made with care</small></div><div><span><Heart size={17}/></span><b>Made with love</b><small>A little joy in every bite</small></div></div><a href="#menu" className="text-link">Find your favourite <ArrowRight size={16}/></a>
        </motion.div>
      </section>

      <section className="values-section" id="why-us"><div className="section-wrap">
        <motion.div className="section-heading centered light-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}}><span className="eyebrow"><span className="eyebrow-line"/> THE ZAIKA PROMISE</span><h2>Little things. <span className="heading-accent">Big feelings.</span></h2><p>Good food is more than a meal. It’s a moment to look forward to.</p></motion.div>
        <motion.div className="values-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,amount:.15}}>
          {[{icon:<ChefHat/>,title:'Made with care',text:'Thoughtful preparation, with attention to the details that matter.'},{icon:<Leaf/>,title:'Quality-minded',text:'A flavour-first approach and care in choosing ingredients.'},{icon:<Heart/>,title:'Comforting favourites',text:'Familiar cravings, fun bites and sweet little treats.'},{icon:<Sparkles/>,title:'Your everyday adda',text:'A welcoming food spot built around the cravings you love.'}].map(v=><motion.div variants={reveal} whileHover={{y:-6}} className="value-card" key={v.title}><span className="value-icon">{v.icon}</span><h3>{v.title}</h3><p>{v.text}</p><span className="value-card-mark">✳</span></motion.div>)}
        </motion.div>
      </div></section>

      <section className="poster-promo section-wrap"><motion.div className="promo-copy" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}><span className="eyebrow"><span className="eyebrow-line"/> YOUR CRAVINGS CALLED</span><h2>Unka jawab?<br/><span className="heading-accent">ZaikaAdda.</span></h2><p>Rolls, burgers, noodles, snacks and sweet treats — your next favourite could be right here.</p><a href="#menu" className="button button-gold">Find your flavour <ArrowRight size={16}/></a></motion.div><motion.div className="promo-poster" initial={{opacity:0,scale:.96,rotate:1}} whileInView={{opacity:1,scale:1,rotate:0}} viewport={{once:true,amount:.2}} transition={{duration:.75}}><img src="/images/zaikaadda-poster-purple.webp" alt="ZaikaAdda promotional poster" loading="lazy"/></motion.div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner">
        <motion.div className="contact-copy" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}><span className="eyebrow"><span className="eyebrow-line"/> SAY HELLO TO THE ADDA</span><h2>Have a craving?<br/><span className="heading-accent">Let’s talk.</span></h2><p>Have a menu question, collaboration idea or order enquiry? Chat with us directly on WhatsApp.</p>
          <a className="contact-email" href={whatsappUrl('Hello ZaikaAdda, I have a question about your menu.')}><span><WhatsAppIcon size={22}/></span><span><small>CHAT WITH US ON WHATSAPP</small><strong>+91 93367 40942</strong></span><ArrowRight className="contact-arrow" size={18}/></a>
          <div className="social-row"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramBrandIcon size={18}/> Instagram <ArrowRight size={13}/></a><a href={FACEBOOK} target="_blank" rel="noreferrer"><FacebookBrandIcon size={18}/> Facebook <ArrowRight size={13}/></a><a href={whatsappUrl('Hello ZaikaAdda, I would like to get in touch.')} target="_blank" rel="noreferrer"><WhatsAppIcon size={18}/> WhatsApp <ArrowRight size={13}/></a></div>
        </motion.div>
        <motion.div className="contact-card" initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}} transition={{duration:.7}}><div className="contact-card-top"><span className="contact-card-icon"><MapPin size={22}/></span><span className="contact-tag">YOUR LOCAL FOOD ADDA</span></div><h3>Rooted in<br/><span>Barabanki.</span></h3><p>ZaikaAdda<br/>Barabanki, Uttar Pradesh, India</p><div className="contact-divider"/><div className="contact-detail"><span><WhatsAppIcon size={19}/></span><span><small>WHATSAPP ORDERS</small><strong>+91 93367 40942</strong></span></div><div className="contact-detail"><span><InstagramBrandIcon size={18}/></span><span><small>FOLLOW ALONG</small><strong>@zaikaaddaofficial</strong></span></div><div className="contact-card-bottom">हर Bite में Zaika! <span>✦</span></div></motion.div>
      </div></section>
    </main>

    <footer className="footer"><div className="section-wrap footer-main"><a className="brand footer-brand" href="#home"><img src="/images/brand-logo.webp" alt="ZaikaAdda logo"/><span className="brand-copy"><strong>Zaika<span>Adda</span></strong><small>HAR BITE MEIN ZAIKA!</small></span></a><p className="footer-tagline">Cravings ka perfect adda.<br/>Good food. Good mood.</p><div className="footer-links"><a href="#menu">Our Menu</a><a href="#story">Our Story</a><a href="#why-us">The Zaika Promise</a><a href="#contact">Contact</a></div><div className="footer-social"><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramBrandIcon size={19}/></a><a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookBrandIcon size={19}/></a><a href={whatsappUrl('Hello ZaikaAdda, I would like to get in touch.')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={19}/></a><a href="https://theadvertisers.in" target="_blank" rel="noreferrer" aria-label="The Advertisers website"><MoveUpRight/></a></div></div><div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} ZaikaAdda. All rights reserved.</span><div className="developer-credit"><span className="developer-credit-label">Website developed by</span><div className="developer-brands"><a className="developer-brand ank-brand" href="https://alfaaznadeemkhan.in" target="_blank" rel="noreferrer" aria-label="Alfaaz Nadeem Khan portfolio"><img src="/images/ank-logo.png" alt="Alfaaz Nadeem Khan ANK logo"/><span><strong>Alfaaz Nadeem Khan</strong><small>alfaaznadeemkhan.in</small></span><MoveUpRight size={12}/></a><a className="developer-brand advertisers-brand" href="https://theadvertisers.in" target="_blank" rel="noreferrer" aria-label="The Advertisers website"><img className="advertisers-mark" src="/images/the-advertisers-logo.png" alt="The Advertisers logo"/><span><strong>The Advertisers</strong><small>theadvertisers.in</small></span><MoveUpRight size={12}/></a></div></div><span className="made-with">Made with <Heart size={12} fill="currentColor"/> in Barabanki, UP</span><a className="back-top" href="#home">Back to top <ArrowDown size={13}/></a></div></footer>

    <AnimatePresence>{cartOpen&&<><motion.button className="drawer-backdrop" aria-label="Close picks panel" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCartOpen(false)}/><motion.aside className="cart-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}} aria-label="My picks panel">
      <div className="drawer-header"><div><span className="eyebrow"><span className="eyebrow-line"/> YOUR CRAVINGS LIST</span><h2>My Picks <span>({itemCount})</span></h2></div><button className="icon-button drawer-close" onClick={()=>setCartOpen(false)} aria-label="Close picks panel"><X/></button></div>
      {cart.length===0?<div className="cart-empty"><span><ShoppingBag size={27}/></span><h3>Your picks are waiting.</h3><p>Add something tasty from our menu and it’ll show up here.</p><button className="button button-gold" onClick={()=>{setCartOpen(false);document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}}>Explore menu <ArrowRight size={15}/></button></div>:<><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-copy"><strong>{item.name}</strong><small>Price to be confirmed</small><div className="quantity-controls"><button onClick={()=>updateQuantity(item.id,-1)} aria-label={`Remove one ${item.name}`}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id,1)} aria-label={`Add one ${item.name}`}><Plus size={13}/></button></div></div><button className="remove-item" onClick={()=>setCart(c=>c.filter(p=>p.id!==item.id))} aria-label={`Remove ${item.name}`}><X size={14}/></button></div>)}</div><div className="drawer-bottom"><p>We’ll confirm current prices, availability and delivery options with you on WhatsApp.</p><button className="button button-whatsapp button-full" onClick={orderOnWhatsApp}><WhatsAppIcon size={19}/> Order on WhatsApp</button><button className="clear-cart" onClick={()=>setCart([])}>Clear list</button></div></>}
    </motion.aside></>}</AnimatePresence>
    <a className="floating-email" href={whatsappUrl('Hello ZaikaAdda, I would like to enquire about your menu.')} target="_blank" rel="noreferrer" aria-label="Chat with ZaikaAdda on WhatsApp"><span className="wa-rope-mascot" aria-hidden="true"><i className="wa-rope"/><b>🧑‍🍳</b><i className="wa-rope-hand"/></span><WhatsAppIcon size={21} className="whatsapp-blue-icon"/><span>Order on WhatsApp</span></a>
  </div>;
}

function ArrowUpRightIcon(){return <MoveUpRight size={15}/>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
