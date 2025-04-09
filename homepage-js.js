const linkItems = document.querySelectorAll(".link-item");
const indicator = document.querySelector(".indicator");

linkItems.forEach((linkItem, index) => {
    const setIndicatorPosition = () => {
        const leftPosition = linkItem.offsetLeft + linkItem.offsetWidth / 2;
        indicator.style.left = `${leftPosition}px`;
        indicator.style.opacity = "1"; // Show indicator
        linkItem.querySelector(".link-text").style.opacity = "1"; // Show text
    };

    linkItem.addEventListener("click", () => {
        document.querySelector(".link-item.active").classList.remove("active");
        document.querySelectorAll(".link-text").forEach(text => (text.style.opacity = "0")); // Hide all texts

        linkItem.classList.add("active");
        setIndicatorPosition();
    });

    linkItem.addEventListener("mouseenter", () => {
        setIndicatorPosition();
    });

    linkItem.addEventListener("mouseleave", () => {
        if (!linkItem.classList.contains("active")) {
            indicator.style.opacity = "0"; // Hide indicator
            linkItem.querySelector(".link-text").style.opacity = "0"; // Hide text
        }
    });
});

document.getElementById("contact-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default anchor behavior

    // Show the modal
    document.getElementById("feedback-modal").style.display = "flex";

    // Disable page scroll by setting overflow to hidden on the body
    document.body.style.overflow = "hidden";
});

document.getElementById("close-btn").addEventListener("click", function() {
    // Close the modal
    document.getElementById("feedback-modal").style.display = "none";

    // Re-enable page scroll by setting overflow back to auto
    document.body.style.overflow = "auto";
});



document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken"); // Retrieve JWT from localStorage

  const sections = {
    hero: document.querySelector(".hero"),
    evideocontainer: document.querySelector(".evideocontainer"),
    liveGraph: document.querySelector(".live-graph"),
    ebookContainer: document.querySelector(".ebook-container"),
    noteContainer: document.querySelector(".note-container"),
  };

  const buttons = {
    hero: null,
    ebook: document.querySelector("#ebook-link"),
    video: document.querySelector("#evideo-link"),
    tradeChart: document.querySelector("#trade-chart-link"),
    note: document.querySelector("#note-link"),
  };

  const showSection = (sectionName) => {
    // Hide all sections
    Object.values(sections).forEach((section) => {
      section.style.display = "none";
    });

    // Show the selected section
    sections[sectionName].style.display = "flex";
  };

  // Default view is hero
  showSection("hero");

  // Set event listeners for buttons
  buttons.ebook.addEventListener("click", (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to access this content.");
      showSection("hero");
      return;
    }
    showSection("ebookContainer");
  });

  buttons.video.addEventListener("click", (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to access this content.");
      showSection("hero");
      return;
    }
    showSection("evideocontainer");
  });

  buttons.tradeChart.addEventListener("click", (e) => {
    e.preventDefault();
    if (!token) {
      showSection("hero");
      return;
    }
    showSection("liveGraph");
  });

  buttons.note.addEventListener("click", (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to access this content.");
      showSection("hero");
      return;
    }
    showSection("noteContainer");
  });
});



document.addEventListener("DOMContentLoaded", function () {
    const tradeChartLink = document.getElementById("trade-chart-link");
    const heroSection = document.getElementById("hero");
    const liveGraphSection = document.getElementById("live-graph");

    tradeChartLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Add the flip-out class to the hero section
        heroSection.classList.add("flip-out");

        // Wait for the flip-out animation to complete before showing the live graph
        setTimeout(() => {
            heroSection.style.display = "none"; // Hide the hero section
            heroSection.classList.remove("flip-out"); // Reset the flip animation for reuse

            // Show the live-graph with the flip-in animation
            liveGraphSection.style.display = "block";
            liveGraphSection.classList.add("flip-in");

            // Remove flip-in class after animation completes for reuse
            setTimeout(() => {
                liveGraphSection.classList.remove("flip-in");
            }, 1000);
        }, 1000);
    });
});


const videos = [
  { title: "What Is Forex?",
    description: "What Is Forex? 💹 | Trade Currencies & Profit from Market Moves! 📈💰", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NhFlqFVBmxc?si=nhsl8-sdAeSOO9gc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "Currency Pairs Explained", 
    description: "Currency Pairs Explained 💱 | Forex Trading Basics Learn about major, minor, and exotic currency pairs, how they work, and why they matter in forex trading! 📈✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RMADDeFVkBA?si=h3ZPx-6IjnrFSa0A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "Major, Minor & Exotic Pairs", 
    description: "Major, Minor & Exotic Pairs 💱 | Forex Trading Guide Discover the differences between major, minor, and exotic currency pairs and how they impact forex trading! 📈✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/8FSfNYjuP-4?si=iNIAUhD_AeAHiE5P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "What Does The Bid & Ask Mean?", 
    description: "What Does The Bid & Ask Mean? 💰💱 | Forex Trading Basics Learn the difference between the bid (buying price) and ask (selling price) and how they impact your trades! 📈✨.", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/C8javNC7pwQ?si=H5afvpj4abHCVDyU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "Forex Spread Explained", 
    description: "Forex Spread Explained 💱📉 | Trading Costs & Profits Learn what the forex spread is, how it affects your trades, and why it matters in currency trading! 💰✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/r1N22WzhzPM?si=JJDbwQrbDRLIf02D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "Financial leverage explained", 
    description: "Financial Leverage Explained 💰📈 | Maximize Your Trading Power Learn how financial leverage works, its benefits, risks, and how traders use it to amplify profits! ⚖️✨.", 
    iframe:`<iframe width="560" height="315" src="https://www.youtube.com/embed/GJ-Bjq1Xvks?si=saTPDBoalaJyOxG-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`},
     { title: "What is a Pip In Forex Trading?", 
    description: "What is a Pip in Forex Trading? 💱📊 | Forex Basics Learn what a pip is, how it measures price movement, and why it’s important in forex trading! 📈✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/vqYGdEFEy2s?si=p-2-eTUonBgvOP3O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "All about margin and leverage in forex trading", 
    description: "All About Margin & Leverage in Forex Trading 💰📈 | Risk & Rewards Learn how margin and leverage work, their benefits, risks, and how to use them wisely in forex trading! ⚖️✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RgmDywzNlZA?si=I-EQK0p8LomeBkn0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "What are stop loss and take profit orders and how to use them effectively when trading?", 
    description: "Stop Loss & Take Profit Explained 🎯💰 | Risk Management in Trading Learn how Stop Loss and Take Profit orders work, why they’re essential, and how to use them effectively to manage risk and maximize profits! 📈✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/s1ERtcbKgbY?si=HiUHwX1l04geMVIb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
  { title: "Market Order, Buy Limit, Sell Limit, Buy Stop, Sell Stop", 
    description: "Market & Pending Orders Explained 💰📈 | Forex Trading Basics Learn the difference between Market Order, Buy Limit, Sell Limit, Buy Stop, and Sell Stop, and how to use them effectively in forex trading! 💱✨", 
    iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yWTBndni56g?si=zxL0GpvKfFR2N374" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "This Trend Indicator Also Filters Out Ranging Markets!",
      description: "This Trend Indicator Filters Out Ranging Markets! 📉📈 | Trade Smarter 💰 Discover a powerful trend indicator that helps you avoid sideways markets and trade with confidence! 🚀✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/NYQmQYP4X5Y?si=tvJHSUe_33iHPXen" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "How I Research Stocks - Step-by-Step Fundamental Analysis", 
      description: "How I Research Stocks 📊💰 | Step-by-Step Fundamental Analysis Learn how to analyze stocks using key fundamentals, financials, and market trends to make smarter investment decisions! 📈✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kXYvRR7gV2E?si=Of-m1qC1E18Ucfhf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "Technical Analysis is Hard (until you see this)", 
      description: "Technical Analysis is Hard... Until You See This! 🔥📈 Unlock simple yet powerful techniques to read charts, spot trends, and trade with confidence! 💰🚀", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/lGhFX4Pwj6Y?si=moS9pj4wrp5oy5jY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "Candlestick Patterns for Beginners", 
      description: "A beginner-focused video that explains candlestick basics and their importance.", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_I1omSmy44Q?si=k_KsmlLniHTYCJ2y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "Forex Trading Sessions Explained!", 
      description: "Forex Trading Sessions Explained! ⏰💱 | Best Times to Trade Learn about the major forex trading sessions, their market impacts, and the best times to trade for maximum profits! 📈✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/znpD7T_9fMQ?si=rAw5dLf_AEG-1jZm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "The ONLY Trading Psychology Concept you need to PROFIT Trading", 
      description: "The ONLY Trading Psychology Concept You Need to Profit! 🧠💰 Master this key mindset shift to stay disciplined, control emotions, and trade like a pro! 📈🔥", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6yhe-gNpY08?si=9pgCA1gAi650t6vl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "Forex Trading: Risk Management And Position Sizing ", 
      description: "Forex Trading: Risk Management & Position Sizing 📉💰 Learn how to protect your capital, manage risk effectively, and size your trades for consistent profits! 📈✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/q5UiDAk1740?si=2EwPMwPmwNRlzort" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "How To Open A Forex Demo Account - MetaTrader 4 (PC, Laptop, Mobile Phone & Tablet)", 
      description: "How to Open a Forex Demo Account 🔥💱 | MetaTrader 4 Guide (PC, Mobile & Tablet) Learn step-by-step how to set up a free MT4 demo account on any device and start practicing forex trading today! 📈📊✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/GnfsmAHBWiM?si=xl_KaVosu6kZiAgt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "Choosing a Forex Broker Explained", 
      description: "Choosing a Forex Broker Explained 💼💱 | Key Factors to Consider Learn how to pick the right forex broker by evaluating spreads, regulations, leverage, and trading platforms! 📈✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/DLEe1rsxGZA?si=vp6oDARTMfyGIRsj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { title: "EVERY Candlestick Pattern YOU Need to Know to Trade Forex", 
      description: "Every Candlestick Pattern You NEED to Know! 📊🔥 | Forex Trading Guide Master essential candlestick patterns to spot trends, reversals, and trade with confidence! 📈💰✨", 
      iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kLLMCoPb6h0?si=PTVjF2CKzXrklpAa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` }
    
  // Add the rest of your videos here...
];

const videoCards = document.getElementById("videoCards");

videos.forEach((video, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    ${video.iframe}
    <h2>${video.title}</h2>
    <p>${video.description}</p>
  `;
  card.style.animationDelay = `${index * 0.2}s`; // Staggered animation delay
  videoCards.appendChild(card);
});

// Auto-scroll to the first video
document.addEventListener("DOMContentLoaded", () => {
  videoCards.scrollLeft = 0;
});


//ebook

    const cardData = [
        { image: "https://m.media-amazon.com/images/I/914cnJa7ltL._AC_UF1000,1000_QL80_.jpg", 
          title: "Currency Trading For Dummies", 
          description: "Currency Trading For Dummies is a hands-on, user-friendly guide that explains how the foreign exchange (ForEx) market works and how you can become a part of it.", 
          pdf: "pdf/Currency Trading For Dummies (Brian Dolan) (Z-Library).pdf" },
        { image: "https://m.media-amazon.com/images/I/51VV-Tr-eBL._UF1000,1000_QL80_.jpg", 
          title: "Day Trading the Currency Market", 
          description: "Discover a variety of technical and fundamental profit–making strategies for trading the currency market with the Second Edition of Day Trading and Swing.", 
          pdf: "pdf/Day Trading the Currency Market.pdf" },
        { image: "https://m.media-amazon.com/images/I/51402YFO9pL._UF1000,1000_QL80_.jpg", 
          title: "Forex Patterns and Probabilities", 
          description: "While most books on trading deal with general concepts and shy away from specifics, Forex Patterns and Probabilities provides you with real-world strategies and a rare sense of clarity about the specific mechanics of currency trading.", 
          pdf: "pdf/Forex Patterns and Probabilities.pdf" },
        { image: "https://m.media-amazon.com/images/I/81apz8N6T8L._AC_UF1000,1000_QL80_.jpg", 
          title: "Forex Trading Using Intermarket Analysis", 
          description: "Intermarket analysis helps traders identify and anticipate changes in trend direction and prices due to influences of other related markets as financial markets .", 
          pdf: "pdf/Forex Trading Using Intermarket Analysis (Louis B. Mendelsohn) (Z-Library).pdf" },
        { image: "https://m.media-amazon.com/images/I/51j7Rj2-FeL._UF1000,1000_QL80_.jpg", 
          title: "How_to_Make_a_Living_Trading_Foreign_Exchange", 
          description: "How to Make a Living Trading Foreign Exchange shows how to take risk management one step beyond and use it as an offensive weapon for enhancing profits.", 
          pdf: "pdf/How_to_Make_a_Living_Trading_Foreign_Exc.pdf" },
        { image: "https://m.media-amazon.com/images/I/71jjxA3ptVL.jpg", 
          title: "Jack Schwager - The New Market Wizards", 
          description: "The New Market Wizards, Stock Market Wizards and Unknown Market Wizards: The best traders you've never heard of. ", 
          pdf: "pdf/Jack Schwager - The New Market Wizards.pdf"},
        { image: "https://m.media-amazon.com/images/I/91Ib9W6sHiL._UF1000,1000_QL80_.jpg", 
          title: "Japanese Candlestick Charting Technique", 
          description: "Traditional Western methods for chart analysis (the basis of all technical analyses) use bar or points and figure charts.", 
          pdf: "pdf/Japanese Candlestick Charting Technique.pdf" },
        { image: "https://m.media-amazon.com/images/I/619JmIa1R7L._AC_UF1000,1000_QL80_.jpg", 
          title: "market-mind-games", 
          description: "Seize the advantage in every trade using your greatest asset—“psychological capital”! When it comes to investing, we're usually taught to “conquer” our emotions.", 
          pdf: "pdf/market-mind-games.pdf" },
        { image: "https://m.media-amazon.com/images/I/81utZg0p72L._UF1000,1000_QL80_.jpg",
          title: "Mastering-Trading-Psychology", 
          description: "Andrew Aziz describes technology, strategy, and psychology as the three essential pillars of successful trading, and he knows that the psychological aspects of trading are the most likely to be underestimated or even ignored.", 
          pdf: "pdf/Mastering-Trading-Psychology.pdf" },
        { image: "https://m.media-amazon.com/images/I/71uNTuc1l6S.jpg", 
          title: "Naked Forex", 
          description: "A streamlined and highly effective approach to trading without indicators Most forex traders rely on technical analysis books written for stock, futures, and option traders.", 
          pdf: "pdf/Naked.Forex.HighProbability.Techniques.for.Trading.Without.Indicators (1).pdf"},
        { image: "https://rukminim2.flixcart.com/image/850/1000/jskofww0/book/9/7/1/one-good-trade-original-imafe3kfjbkhehhv.jpeg?q=90&crop=false", 
          title: "One Good Trade", 
          description: "An inside look at what it really takes to become a better trader A proprietary trading firm consists of a group of professionals who trade the capital of the firm.", 
          pdf: "pdf/One Good Trade.pdf" },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPPOm2pnsgfq6mSaY4bVN5UNhrAq4UXnF9Q&s", 
          title: "Technical Analysis of the Financial Markets ", 
          description: "Revised and expanded for the demands of today's financial world, this book is essential reading for anyone interested in tracking and analyzing market behavior.", 
          pdf: "pdf/Technical Analysis of the Financial Markets by John J. Murphy.pdf" },
        { image: "https://m.media-amazon.com/images/I/71CGBtNeTUL._AC_UF1000,1000_QL80_.jpg",
          title: "The Art of Currency Trading", 
          description: "Now you can master the art of foreign exchange trading While most currency trading and foreign exchange books focus on international finance theory or simplistic chart-based strategies.", 
          pdf: "pdf/The Art of Currency Trading.pdf" },
        { image: "https://m.media-amazon.com/images/I/71lLP5gA7qL.jpg", 
          title: "The Disiplined Trader-mark douglas", 
          description: "The classic book that introduced the investment industry to the concept of trading psychology.", 
          pdf: "pdf/The Disiplined Trader-mark douglas.pdf" },
       ];

 
function renderCards() {
  const bookcontainer = document.querySelector('.book-card-container');
  const pdfmodal = document.getElementById('pdf-modal');
  const pdfFrame = document.getElementById('pdf-frame');
  const closeModal = document.getElementById('pdf-close-modal');

  cardData.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'book-card';

      cardElement.innerHTML = `
          <img src="${card.image}" alt="${card.title}">
          <div class="text">
              <h3>${card.title}</h3>
              <p>${card.description}</p>
          </div>
      `;
      cardElement.style.animationDelay = `${index * 0.2}s`; // Staggered animation delay

      cardElement.addEventListener('click', () => {
          if (card.pdf) {
              pdfFrame.src = card.pdf;
              pdfmodal.style.display = "flex";
              document.querySelector(".home-content").classList.add('blur');
              document.body.style.overflow = "hidden";
          } else {
              alert('No PDF available for this card.');
          }
      });

      bookcontainer.appendChild(cardElement);
  });

  closeModal.addEventListener('click', () => {
      pdfmodal.style.display = "none";
      pdfFrame.src = "";
      document.querySelector(".home-content").classList.remove('blur');
      document.body.style.overflow = "visible";
  });

  pdfmodal.addEventListener('click', (e) => {
      if (e.target === pdfmodal) {
          pdfmodal.style.display = "none";
          pdfFrame.src = "";
          document.querySelector(".home-content").classList.remove('blur');
          document.body.style.overflow = "visible";
      }
  });
}

renderCards();

//short notes
const notecard = [
    { image: "image/chart1.png", 
      title: "head and shoulders", 
      description: "Head and Shoulders is a popular chart pattern in technical analysis that signals a trend reversal.", 
      add:"The Head and Shoulders pattern consists of three peaks: a higher middle peak (head) between two lower peaks (shoulders). It indicates a potential reversal in trend, with the neckline acting as a key support or resistance level." },
    { image: "image/chart2.png", 
      title: "inverse head and shoulders", 
      description: "The Inverse Head and Shoulders is a bullish reversal pattern that signals a potential upward trend.",
      add:"The Inverse Head and Shoulders pattern consists of three troughs: a lower middle trough (head) between two higher troughs (shoulders). It suggests a reversal from a downtrend to an uptrend, with the neckline as a breakout level." },
      { image: "image/chart3.png", 
        title: "double top pattern", 
        description: "A Double Top pattern is a bearish reversal chart pattern that signals a potential downtrend.", 
        add:"The Double Top pattern consists of two peaks at a similar level, separated by a trough. When the price breaks below the support level (neckline), it confirms a trend reversal from bullish to bearish." },
      { image: "image/chart4.png", 
        title: "double bottom pattern", 
        description: "A Double Bottom pattern is a bullish reversal chart pattern that signals a potential uptrend.",
        add:"The Double Bottom pattern consists of two consecutive troughs at a similar level, separated by a peak. When the price breaks above the resistance level (neckline), it confirms a reversal from bearish to bullish." },
        { image: "image/chart5.png", 
          title: "triple top pattern", 
          description: "A Triple Top pattern is a bearish reversal chart pattern that signals a potential downtrend.", 
          add:"The Triple Top pattern consists of three peaks at a similar level, indicating strong resistance. When the price breaks below the support level (neckline), it confirms a reversal from bullish to bearish." },
        { image: "image/chart6.png", 
          title: "triple bottom pattern", 
          description: "A Triple Bottom pattern is a bullish reversal chart pattern that signals a potential uptrend.",
          add:"The Triple Bottom pattern consists of three troughs at a similar level, indicating strong support. When the price breaks above the resistance level (neckline), it confirms a reversal from bearish to bullish." },
          { image: "image/chart7.png", 
            title: "rounded top pattern", 
            description: "A Rounded Top pattern is a bearish reversal chart pattern that signals a gradual shift from an uptrend to a downtrend.", 
            add:"The Rounded Top pattern forms a dome-like shape, where the price gradually rises, flattens, and then declines. It indicates weakening buying pressure and a potential trend reversal to the downside." },
          { image: "image/chart8.png", 
            title: "rounded bottom pattern", 
            description: "A Rounded Bottom pattern is a bullish reversal chart pattern that signals a gradual shift from a downtrend to an uptrend.",
            add:"The Rounded Bottom pattern forms a U-shaped curve, where the price gradually declines, stabilizes, and then rises. It indicates strengthening buying pressure and a potential trend reversal to the upside." },
            { image: "image/chart9.png", 
              title: "ascending triangle pattern", 
              description: "An Ascending Triangle pattern is a bullish continuation chart pattern that signals a potential breakout to the upside.", 
              add:"The Ascending Triangle pattern forms with a horizontal resistance line and an upward-sloping support line. When the price breaks above the resistance level with strong volume, it confirms a bullish breakout."},
            { image: "image/chart10.png", 
              title: "descending triangle pattern", 
              description: "A Descending Triangle pattern is a bearish continuation chart pattern that signals a potential breakout to the downside.",
              add:"The Descending Triangle pattern forms with a horizontal support line and a downward-sloping resistance line. When the price breaks below the support level with strong volume, it confirms a bearish breakout." },
              { image: "image/chart11.png", 
                title: "falling wedge pattern", 
                description: "A Falling Wedge pattern is a bullish reversal or continuation chart pattern that signals a potential upward breakout.", 
                add:"The Falling Wedge pattern forms with converging downward-sloping trendlines, indicating decreasing selling pressure. When the price breaks above the upper trendline with strong volume, it confirms a bullish move." },
              { image: "image/chart12.png", 
                title: "rising wedge pattern", 
                description: "A Rising Wedge pattern is a bearish reversal or continuation chart pattern that signals a potential downward breakout.",
                add:"The Rising Wedge pattern forms with converging upward-sloping trendlines, indicating weakening buying pressure. When the price breaks below the lower trendline with strong volume, it confirms a bearish move." },
                { image: "image/chart13.png", 
                  title: "pennant pattern", 
                  description: "A Pennant pattern is a continuation chart pattern that signals a brief consolidation before a strong breakout in the trend’s direction.", 
                  add:"The Pennant pattern forms after a sharp price movement (flagpole) and consists of converging trendlines, resembling a small triangle. When the price breaks out in the direction of the previous trend, it confirms trend continuation." },
                { image: "image/chart14.png", 
                  title: "falling pennant pattern", 
                  description: "A Falling Pennant pattern is a bullish continuation chart pattern that signals a brief consolidation before an upward breakout.",
                  add:"The Falling Pennant pattern forms after a strong upward move (flagpole) and consists of downward-sloping converging trendlines. When the price breaks above the upper trendline, it confirms the continuation of the bullish trend." },
    ];

function noteCards() {
  const noteContainer = document.querySelector('.note-card-container');
  const tipModal = document.getElementById('tip-modal');
  const tipModalImage = document.getElementById('tip-modal-image');
  const tipModalTitle = document.getElementById('tip-modal-title');
  const tipModalDescription = document.getElementById('tip-modal-description');
  const tipModalLocation = document.getElementById('tip-modal-add-data');
  const tipCloseBtn = document.getElementById('tip-close-btn');

  notecard.forEach((card, index) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note-card';

      noteElement.innerHTML = `
          <img src="${card.image}" alt="${card.title}">
          <div class="text">
              <h3>${card.title}</h3>
              <p>${card.description}</p>
          </div>
      `;

      noteElement.style.animationDelay = `${index * 0.2}s`; // Staggered animation delay

      // Show tip modal on click
      noteElement.addEventListener('click', () => {
          tipModalImage.src = card.image;
          tipModalTitle.textContent = card.title;
          tipModalLocation.textContent = card.add;
          tipModal.style.display = 'flex';
          document.querySelector(".home-content").classList.add('blur');
          document.body.style.overflow = "hidden";
      });

      noteContainer.appendChild(noteElement);
  });

  // Close tip modal when clicking the close button
  tipCloseBtn.addEventListener('click', () => {
      tipModal.style.display = 'none';
      document.querySelector(".home-content").classList.remove('blur');
      document.body.style.overflow = "visible";
  });

  // Close tip modal when clicking outside the modal content
  tipModal.addEventListener('click', (e) => {
      if (e.target === tipModal) {
          tipModal.style.display = 'none';
          document.querySelector(".home-content").classList.remove('blur');
          document.body.style.overflow = "visible";
      }
  });
}

noteCards();

    //logreg
    const logreg = document.querySelector(".logreg-box");
const loglink = document.querySelector(".login-link");
const reglink = document.querySelector(".register-link");

reglink.addEventListener('click',()=>{
    logreg.classList.add('active');
})

loglink.addEventListener('click',()=>{
    logreg.classList.remove('active');
})

const panelContainer = document.getElementById('panelContainer');
const body = document.body;

function showLoginPanel() {
    panelContainer.classList.add('active');
    document.querySelector(".home-content").classList.add('blur');
    backgroundBlocker.style.display = 'block'; // hide the background blocker
    document.body.style.overflow = "hidden";
}

function hideLoginPanel() {
    panelContainer.classList.remove('active');
    document.querySelector(".home-content").classList.remove('blur');
    backgroundBlocker.style.display = 'none'; // hide the background blocker
    document.body.style.overflow = "auto";
}


  
//safety


document.addEventListener('copy', (event) => {
    event.preventDefault(); // Prevent the default copy action

    // Check if the target is an image
    const selection = window.getSelection();
    const selectedNode = selection.anchorNode?.parentElement;

    if (selectedNode && selectedNode.tagName === 'IMG') {
        const customText = "you try to copy me"; // Text to set when an image is copied
        if (event.clipboardData) {
            event.clipboardData.setData('text/plain', customText);
        }
    } else {
        // Handle text copying
        const customText = "you try to copy me "; // Text to set when text is copied
        if (event.clipboardData) {
            event.clipboardData.setData('text/plain', customText);
        }
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Disable right-click
});

document.addEventListener('keydown', function(event) {
    // Block Ctrl + U (View Source)
    if (event.ctrlKey && event.keyCode === 85) { 
        event.preventDefault();
        window.location.href = "https://yourwebsite.com/disabled";  // This attempts to close the current window
    }

    // Block F12 (DevTools)
    if (event.keyCode === 123) { // F12 key
        event.preventDefault();
        window.location.href = "https://yourwebsite.com/disabled";  // This attempts to close the current window
    }

    // Block Ctrl + Shift + I (Inspect Element)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) { // Ctrl + Shift + I
        event.preventDefault();
        window.location.href = "https://yourwebsite.com/disabled";  // This attempts to close the current window
    }

    // Block Ctrl + Shift + 3 (Screenshot Tool)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 51) { // Ctrl + Shift + 3
        event.preventDefault();
        window.location.href = "https://yourwebsite.com/disabled";  // This attempts to close the current window
    }
});

//theme toggle
const themeToggleButton = document.getElementById('theme-toggle');


// Apply the saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
} else {
  // Default to dark theme if no preference is saved
  body.classList.add('dark-theme');
}

// Toggle theme and save the user's preference
themeToggleButton.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});

// Get the settings link, container elements, and background blocker
const settingLink = document.getElementById("Setting-link");
const settingContainer = document.querySelector(".setting-container");
const closeBtn = document.querySelector(".close-btn-set");
const backgroundBlocker = document.getElementById("background-blocker");

// Open settings container when the link is clicked
settingLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    settingContainer.style.display = "block"; // Show the settings panel
    backgroundBlocker.style.display = "block"; // Show background blocker
    document.querySelector(".home-content").classList.add('blur'); // Add blur effect
    document.body.style.overflow = "hidden"; // Hide the scrollbar
});

// Close settings container when the close button is clicked
closeBtn.addEventListener("click", () => {
    settingContainer.style.display = "none"; // Hide the settings panel
    backgroundBlocker.style.display = "none"; // Hide the background blocker
    document.body.style.overflow = "auto"; // Show the scrollbar
    document.querySelector(".home-content").classList.remove('blur'); // Remove blur effect
});

// Optional: Close settings if the background blocker is clicked
backgroundBlocker.addEventListener("click", () => {
    settingContainer.style.display = "none"; // Hide the settings panel
    backgroundBlocker.style.display = "none"; // Hide the background blocker
    document.body.style.overflow = "auto"; // Show the scrollbar
    document.querySelector(".home-content").classList.remove('blur'); // Remove blur effect
});

//font-size
// Get the elements
const fontSizeLink = document.getElementById("font-size");
const fontSizeSlider = document.querySelector(".font-size-slider");
const fontRange = document.getElementById("font-range");
const fontSizeValue = document.getElementById("font-size-value");

// Apply saved font size if exists
window.onload = () => {
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize; // Apply font size to root
        fontRange.value = parseInt(savedFontSize);
        fontSizeValue.textContent = `${savedFontSize}`;
    }
};

// Show the font size slider when clicked
fontSizeLink.addEventListener("click", () => {
    fontSizeSlider.style.display = "block";
});

// Update font size as the user adjusts the slider
fontRange.addEventListener("input", () => {
    const fontSize = fontRange.value;
    fontSizeValue.textContent = `${fontSize}px`;
    document.documentElement.style.fontSize = `${fontSize}px`; // Apply font size to root
});

// Save the font size to localStorage when the user changes it
fontRange.addEventListener("change", () => {
    const fontSize = fontRange.value;
    localStorage.setItem("fontSize", fontSize); // Save font size to localStorage
});


// List of all quiz questions
const quizQuestions = [
  {
      question: "What does Forex stand for?",
      options: ["Foreign Exchange", "Federal Exchange", "Forex Export", "Financial Exchange"],
      answer: "Foreign Exchange"
  },
  {
      question: "Which currency is abbreviated as USD?",
      options: ["United States Dollar", "Ukrainian Dollar", "Universal Dollar", "United States Dinar"],
      answer: "United States Dollar"
  },
  {
      question: "Which of the following is the most traded currency in Forex?",
      options: ["EUR", "GBP", "USD", "JPY"],
      answer: "USD"
  },
  {
      question: "What is a pip in Forex trading?",
      options: ["Percentage in Point", "Price Indicator Point", "Price Increase Percentage", "Pip Increment Position"],
      answer: "Percentage in Point"
  },
  {
      question: "What is a forex broker?",
      options: ["A bank", "A market maker", "An exchange", "A Forex investor"],
      answer: "A market maker"
  },
  {
      question: "What does leverage in Forex trading mean?",
      options: ["The risk of loss", "The amount of money you borrow", "The return on investment", "The profit of the broker"],
      answer: "The amount of money you borrow"
  },
  {
      question: "Which currency pair is known as 'the cable'?",
      options: ["GBP/USD", "EUR/USD", "USD/JPY", "AUD/USD"],
      answer: "GBP/USD"
  },
  {
      question: "What is a currency pair in Forex trading?",
      options: ["Two currencies traded together", "A pair of stocks", "Two commodities", "A bond and a stock"],
      answer: "Two currencies traded together"
  },
  {
      question: "What does the term 'scalping' mean in Forex?",
      options: ["Long-term trading", "Short-term trading", "Trading with a lot of money", "Investing in stocks"],
      answer: "Short-term trading"
  },
  {
      question: "What is a 'lot' in Forex trading?",
      options: ["A stock option", "A group of currencies", "A batch size of the currency traded", "A fixed amount of money"],
      answer: "A batch size of the currency traded"
  },
  {
    question: "What is Forex?",
    options: ["A stock exchange", "A currency exchange market", "A bond market", "A crypto market"],
    answer: "A currency exchange market"
},
{
    question: "Which of the following is a major currency pair?",
    options: ["USD/JPY", "USD/CAD", "GBP/USD", "All of the above"],
    answer: "All of the above"
},
{
    question: "What does 'Pip' stand for in forex trading?",
    options: ["Price index point", "Percentage interest point", "Price in point", "Percentage in point"],
    answer: "Percentage in point"
},
{
    question: "What is the base currency in the pair EUR/USD?",
    options: ["EUR", "USD", "Both", "Neither"],
    answer: "EUR"
},
{
    question: "What does leverage allow a trader to do in forex?",
    options: ["Control a larger position with a smaller amount of capital", "Increase the amount of margin required", "Trade only one currency", "Limit the risk of the trade"],
    answer: "Control a larger position with a smaller amount of capital"
},
{
    question: "What is the most traded currency in the world?",
    options: ["Euro (EUR)", "British Pound (GBP)", "US Dollar (USD)", "Japanese Yen (JPY)"],
    answer: "US Dollar (USD)"
},
{
    question: "In forex trading, what is 'spread'?",
    options: ["The price difference between the bid and ask price", "The difference between two market orders", "The distance between two currency pairs", "The profit made on a trade"],
    answer: "The price difference between the bid and ask price"
},
{
    question: "What is a 'long' position in forex?",
    options: ["Buying a currency pair in anticipation of price increase", "Selling a currency pair in anticipation of price increase", "Buying a currency pair in anticipation of price decrease", "Selling a currency pair in anticipation of price decrease"],
    answer: "Buying a currency pair in anticipation of price increase"
},
{
    question: "What does 'Margin' refer to in forex trading?",
    options: ["The interest earned on a position", "The money required to open a trade", "The total capital invested", "The difference between the buy and sell price"],
    answer: "The money required to open a trade"
},
{
    question: "What is a 'Currency Pair'?",
    options: ["A stock pair", "The value of a single currency", "The exchange rate between two currencies", "The amount of money invested in forex"],
    answer: "The exchange rate between two currencies"
},
{
  question: "What is a forex broker?",
  options: ["A person who trades stocks", "A financial institution that facilitates currency trading", "A type of bank", "A government agency"],
  answer: "A financial institution that facilitates currency trading"
},
{
  question: "Which of the following is a popular forex trading platform?",
  options: ["MetaTrader 4", "E*TRADE", "Robinhood", "Coinbase"],
  answer: "MetaTrader 4"
},
{
  question: "What is the main goal of forex trading?",
  options: ["To buy low and sell high", "To sell low and buy high", "To create long-term investments", "To bet on stock prices"],
  answer: "To buy low and sell high"
},
{
  question: "What is a forex market maker?",
  options: ["A person who designs currencies", "A financial institution or individual that provides liquidity", "A tool for analyzing trades", "A trader who buys only the highest currency pair"],
  answer: "A financial institution or individual that provides liquidity"
},
{
  question: "What is 'stop loss' in forex trading?",
  options: ["A method to calculate potential profits", "An order to automatically close a trade at a certain price", "A way to control leverage", "A trading strategy for long-term investment"],
  answer: "An order to automatically close a trade at a certain price"
},
{
  question: "What does the term 'bear market' refer to in forex?",
  options: ["A market where prices are rising", "A market where prices are falling", "A stable market", "A market with no price movement"],
  answer: "A market where prices are falling"
},
{
  question: "What is the 'lot size' in forex trading?",
  options: ["The number of trades in a day", "The amount of capital invested", "The number of units of currency being traded", "The number of brokers involved in a trade"],
  answer: "The number of units of currency being traded"
},
{
  question: "Which factor can influence forex exchange rates?",
  options: ["Interest rates", "Inflation rates", "Political stability", "All of the above"],
  answer: "All of the above"
},
{
  question: "What is 'scalping' in forex trading?",
  options: ["Trading for long-term profit", "Making many small trades for small profits", "Investing in stocks", "Trading in other markets like crypto"],
  answer: "Making many small trades for small profits"
},
{
  question: "What is 'spread betting' in forex trading?",
  options: ["A form of gambling", "A type of insurance", "Speculating on the price movement of currency pairs", "A method for buying bonds"],
  answer: "Speculating on the price movement of currency pairs"
},
{
  question: "What does a candlestick represent in technical analysis?",
  options: ["Price movement over a period of time", "The volume of trades", "The total number of market participants", "The interest rate of the currency"],
  answer: "Price movement over a period of time"
},
{
  question: "What is a bullish candlestick pattern?",
  options: ["A pattern where the closing price is lower than the opening price", "A pattern where the closing price is higher than the opening price", "A pattern with no movement", "A pattern with equal opening and closing prices"],
  answer: "A pattern where the closing price is higher than the opening price"
},
{
  question: "What is a bearish candlestick pattern?",
  options: ["A pattern where the closing price is lower than the opening price", "A pattern where the closing price is higher than the opening price", "A pattern with no movement", "A pattern with equal opening and closing prices"],
  answer: "A pattern where the closing price is lower than the opening price"
},
{
  question: "What is the body of a candlestick?",
  options: ["The line between the high and low prices", "The difference between the opening and closing price", "The opening price", "The highest price reached"],
  answer: "The difference between the opening and closing price"
},
{
  question: "What does the wick of a candlestick represent?",
  options: ["The highest and lowest price during the period", "The opening price", "The closing price", "The volume of trading"],
  answer: "The highest and lowest price during the period"
},
{
  question: "What is a Doji candlestick pattern?",
  options: ["A candlestick with a small body and long wicks", "A candlestick with a large body and no wicks", "A candlestick with equal opening and closing prices", "A candlestick with no price movement"],
  answer: "A candlestick with equal opening and closing prices"
},
{
  question: "What is the meaning of a bullish engulfing pattern?",
  options: ["A large bearish candlestick followed by a smaller bullish candlestick", "A small bullish candlestick followed by a larger bullish candlestick", "A small bearish candlestick followed by a larger bearish candlestick", "A small bullish candlestick followed by a larger bearish candlestick"],
  answer: "A small bullish candlestick followed by a larger bullish candlestick"
},
{
  question: "What is a bearish engulfing pattern?",
  options: ["A large bearish candlestick followed by a smaller bullish candlestick", "A small bullish candlestick followed by a larger bearish candlestick", "A small bearish candlestick followed by a larger bearish candlestick", "A large bullish candlestick followed by a smaller bearish candlestick"],
  answer: "A small bullish candlestick followed by a larger bearish candlestick"
},
{
  question: "What does the Hammer candlestick pattern indicate?",
  options: ["A potential reversal to the upside", "A continuation of the downtrend", "A sign of indecision in the market", "A continuation of the uptrend"],
  answer: "A potential reversal to the upside"
},
{
  question: "What does an Inverted Hammer candlestick pattern indicate?",
  options: ["A potential reversal to the upside", "A potential reversal to the downside", "A sign of indecision in the market", "A continuation of the uptrend"],
  answer: "A potential reversal to the upside"
},
{
  question: "What does the Shooting Star candlestick pattern indicate?",
  options: ["A potential reversal to the downside", "A potential reversal to the upside", "A continuation of the uptrend", "A continuation of the downtrend"],
  answer: "A potential reversal to the downside"
},
{
  question: "What is the Hanging Man candlestick pattern?",
  options: ["A potential reversal to the downside", "A sign of strong upward momentum", "A continuation of the downtrend", "A sign of indecision in the market"],
  answer: "A potential reversal to the downside"
},
{
  question: "What is a Morning Star candlestick pattern?",
  options: ["A bullish reversal pattern", "A bearish reversal pattern", "A continuation pattern", "A sign of indecision"],
  answer: "A bullish reversal pattern"
},
{
  question: "What is an Evening Star candlestick pattern?",
  options: ["A bearish reversal pattern", "A bullish reversal pattern", "A continuation pattern", "A sign of indecision"],
  answer: "A bearish reversal pattern"
},
{
  question: "What does the Three White Soldiers candlestick pattern indicate?",
  options: ["Strong upward momentum", "A potential reversal to the downside", "A sign of market indecision", "A bearish trend"],
  answer: "Strong upward momentum"
},
{
  question: "What does the Three Black Crows candlestick pattern indicate?",
  options: ["Strong downward momentum", "A potential reversal to the upside", "A sign of market indecision", "A bullish trend"],
  answer: "Strong downward momentum"
},
{
  question: "What does the Bullish Harami pattern represent?",
  options: ["A small bearish candlestick followed by a larger bullish candlestick", "A small bullish candlestick followed by a larger bullish candlestick", "A small bullish candlestick followed by a larger bearish candlestick", "A small bearish candlestick followed by a larger bearish candlestick"],
  answer: "A small bearish candlestick followed by a larger bullish candlestick"
},
{
  question: "What does the Bearish Harami pattern represent?",
  options: ["A small bullish candlestick followed by a larger bearish candlestick", "A small bearish candlestick followed by a larger bearish candlestick", "A small bullish candlestick followed by a larger bullish candlestick", "A small bearish candlestick followed by a larger bullish candlestick"],
  answer: "A small bullish candlestick followed by a larger bearish candlestick"
},
{
  question: "What does a Marubozu candlestick pattern indicate?",
  options: ["A candlestick with no wicks, indicating strong buying or selling pressure", "A candlestick with a small body and long wicks", "A candlestick with no body", "A pattern showing market indecision"],
  answer: "A candlestick with no wicks, indicating strong buying or selling pressure"
},
{
  question: "What does a Doji Star candlestick pattern indicate?",
  options: ["A sign of indecision in the market", "A continuation of the current trend", "A bullish reversal pattern", "A bearish reversal pattern"],
  answer: "A sign of indecision in the market"
},
{
  question: "What is risk management in forex trading?",
  options: ["The process of controlling trade sizes", "The strategy to avoid losing money", "The process of assessing and controlling risk exposure", "The method of predicting market trends"],
  answer: "The process of assessing and controlling risk exposure"
},
{
  question: "What is the primary goal of risk management in forex?",
  options: ["To increase profits at all costs", "To minimize losses while maximizing returns", "To predict market prices", "To follow the market trend"],
  answer: "To minimize losses while maximizing returns"
},
{
  question: "What is a 'stop loss' in risk management?",
  options: ["A technique to reduce trade size", "An order to close a trade at a predetermined loss level", "A way to increase leverage", "A tool to lock in profits"],
  answer: "An order to close a trade at a predetermined loss level"
},
{
  question: "What is the concept of 'leverage' in forex trading?",
  options: ["A method of predicting currency movements", "Using borrowed funds to control a larger position", "A way to limit the number of trades", "A type of stop loss order"],
  answer: "Using borrowed funds to control a larger position"
},
{
  question: "What is a risk-to-reward ratio?",
  options: ["The ratio of profits to losses", "The ratio of expected profits to expected losses", "The amount of capital to be invested", "The number of trades taken per month"],
  answer: "The ratio of expected profits to expected losses"
},
{
  question: "What does 'Position Sizing' refer to in risk management?",
  options: ["The amount of leverage used", "The number of trades placed per day", "Determining the appropriate size for each trade", "The amount of capital required to open a trade"],
  answer: "Determining the appropriate size for each trade"
},
{
  question: "What is a 'take profit' order?",
  options: ["A type of stop loss", "An order to automatically close a trade at a specific profit level", "A way to calculate trade size", "An order to close a trade at the break-even point"],
  answer: "An order to automatically close a trade at a specific profit level"
},
{
  question: "How does diversification help with risk management?",
  options: ["By increasing the leverage", "By spreading investments across different assets to reduce exposure to any one asset", "By trading in only one currency pair", "By using a single risk-to-reward ratio for all trades"],
  answer: "By spreading investments across different assets to reduce exposure to any one asset"
},
{
  question: "What is 'capital allocation' in risk management?",
  options: ["Deciding the amount of money to invest in each trade", "Using stop loss orders", "Determining the leverage used", "Analyzing past trades"],
  answer: "Deciding the amount of money to invest in each trade"
},
{
  question: "Why is it important to set a stop loss order?",
  options: ["To maximize potential losses", "To limit losses in case the market moves against your position", "To ensure the trade hits the target", "To avoid opening too many trades"],
  answer: "To limit losses in case the market moves against your position"
},
{
  question: "What is a common risk management strategy used in forex trading?",
  options: ["Using high leverage on all trades", "Investing only in one currency pair", "Risking a small percentage of your capital on each trade", "Trading as frequently as possible"],
  answer: "Risking a small percentage of your capital on each trade"
},
{
  question: "What is a 'drawdown' in forex trading?",
  options: ["The amount of profit made", "The period of time when a trade is open", "A decrease in equity from the highest point to the lowest point", "A measure of leverage used in a trade"],
  answer: "A decrease in equity from the highest point to the lowest point"
},
{
  question: "What does the '2% rule' in forex risk management mean?",
  options: ["You risk 2% of your capital on each trade", "You only place two trades per day", "You risk 2% of the total capital per week", "You limit your trading account size to 2% of your portfolio"],
  answer: "You risk 2% of your capital on each trade"
},
{
  question: "What is the primary risk associated with using high leverage?",
  options: ["Reduced capital requirements", "Increased potential for profits", "Higher risk of larger losses", "Fewer margin calls"],
  answer: "Higher risk of larger losses"
},
{
  question: "What is 'margin call' in forex trading?",
  options: ["A request to deposit additional funds into your account", "An order to close a trade at a specific profit", "A signal that a trade is in profit", "A warning for reaching a risk-to-reward ratio"],
  answer: "A request to deposit additional funds into your account"
},
{
  question: "How does risk management help improve a trader’s consistency?",
  options: ["By eliminating the possibility of losses", "By ensuring that only profitable trades are taken", "By limiting potential losses and protecting capital", "By increasing leverage"],
  answer: "By limiting potential losses and protecting capital"
},
{
  question: "What is the main advantage of using a trailing stop loss?",
  options: ["It locks in profits as the price moves in your favor", "It reduces the size of your trades", "It automatically closes all trades when a target is reached", "It increases leverage on your trades"],
  answer: "It locks in profits as the price moves in your favor"
},
{
  question: "What is the purpose of risk-reward ratio in forex trading?",
  options: ["To determine the profit potential of a trade", "To decide the maximum amount of leverage to use", "To predict market trends", "To minimize the number of trades you make"],
  answer: "To determine the profit potential of a trade"
},
{
  question: "What is the best way to manage risk when trading multiple currency pairs?",
  options: ["Trading with high leverage", "Diversifying your risk across different currency pairs", "Risking a large percentage of your capital on each trade", "Using the same stop loss for every trade"],
  answer: "Diversifying your risk across different currency pairs"
},
{
  question: "What is the 'R' in risk management referring to?",
  options: ["The return on investment", "The risk taken per trade", "The total capital invested", "The ratio of trading profits to losses"],
  answer: "The risk taken per trade"
},
{
  question: "What is the primary risk of using high leverage in forex trading?",
  options: ["Increased margin requirements", "Increased potential for large gains", "Higher risk of substantial losses", "Decreased market volatility"],
  answer: "Higher risk of substantial losses"
},
{
  question: "Which of the following is a key characteristic of a ‘carry trade’ strategy?",
  options: ["Borrowing in a currency with a low-interest rate and investing in a currency with a higher rate", "Trading short-term fluctuations in volatile markets", "Speculating on currency pair correlations", "Using options to hedge currency positions"],
  answer: "Borrowing in a currency with a low-interest rate and investing in a currency with a higher rate"
},
{
  question: "In which situation is a trader most likely to use a 'Hedging' strategy?",
  options: ["When they expect the market to be highly volatile and unpredictable", "When they want to increase their exposure to a single currency pair", "When they want to capitalize on a trend reversal", "When they anticipate no market movement"],
  answer: "When they expect the market to be highly volatile and unpredictable"
},
{
  question: "What is a key risk associated with using algorithmic trading strategies?",
  options: ["Increased human intervention", "Loss of automation leading to error-free trading", "Unexpected market behavior due to flawed programming or data", "Decreased transaction costs and slippage"],
  answer: "Unexpected market behavior due to flawed programming or data"
},
{
  question: "What does 'slippage' refer to in forex trading?",
  options: ["The time it takes to process a trade", "The difference between the expected price of a trade and the actual price", "A specific strategy for capital allocation", "A tool for tracking historical price movements"],
  answer: "The difference between the expected price of a trade and the actual price"
},
{
  question: "Which of the following scenarios would most likely lead to a 'margin call' in forex?",
  options: ["When a trader’s position moves in favor of the market", "When a trader’s losses exceed their available margin", "When a trader withdraws profits from their account", "When a trader uses high-risk-to-reward ratios"],
  answer: "When a trader’s losses exceed their available margin"
},
{
  question: "What is the primary purpose of 'risk diversification' in a forex portfolio?",
  options: ["To concentrate trades in the most volatile markets", "To reduce the impact of a single position on the overall portfolio", "To increase potential profits from a single asset", "To guarantee profits regardless of market conditions"],
  answer: "To reduce the impact of a single position on the overall portfolio"
},
{
  question: "Which indicator is most commonly used to assess overbought or oversold market conditions?",
  options: ["Relative Strength Index (RSI)", "Moving Average Convergence Divergence (MACD)", "Bollinger Bands", "Fibonacci Retracement"],
  answer: "Relative Strength Index (RSI)"
},
{
  question: "What is the primary disadvantage of using a 'scalping' trading strategy?",
  options: ["It requires less market analysis", "It requires high-frequency trading and often results in higher transaction costs", "It is less affected by market volatility", "It guarantees profits in all market conditions"],
  answer: "It requires high-frequency trading and often results in higher transaction costs"
},
{
  question: "Which of the following best defines a 'head and shoulders' pattern in technical analysis?",
  options: ["A reversal pattern indicating a potential bullish trend", "A continuation pattern indicating a strong upward move", "A reversal pattern indicating a potential bearish trend", "A pattern that shows no clear direction in price movement"],
  answer: "A reversal pattern indicating a potential bearish trend"
},
{
  question: "According to many forex trading books, what is the most important factor to consider before entering a trade?",
  options: ["Market sentiment", "Economic news events", "The risk-to-reward ratio", "The trader's emotional state"],
  answer: "The risk-to-reward ratio"
},
{
  question: "What does the term 'price action' refer to in forex trading?",
  options: ["The price movement of a currency pair over time", "The use of technical indicators to predict trends", "The impact of economic reports on price movements", "The strategy of using leverage to magnify returns"],
  answer: "The price movement of a currency pair over time"
},
{
  question: "Which of the following is commonly described as a psychological barrier to successful trading in forex?",
  options: ["Greed and fear", "Risk-to-reward ratio", "Leverage ratios", "Price action patterns"],
  answer: "Greed and fear"
},
{
  question: "Which of the following best describes 'fundamental analysis' in forex?",
  options: ["Analyzing historical price data and market trends", "Using economic indicators, interest rates, and news events to predict market movements", "Reading chart patterns to determine market trends", "Focusing on price action and chart-based indicators"],
  answer: "Using economic indicators, interest rates, and news events to predict market movements"
},
{
  question: "What does the term 'support' refer to in technical analysis?",
  options: ["A price level where a currency pair tends to rise", "The rate at which a currency pair moves", "A level where a currency pair struggles to break below", "The highest price level reached during a market trend"],
  answer: "A level where a currency pair struggles to break below"
},
{
  question: "Which of the following is a common recommendation from forex trading books for managing trading risk?",
  options: ["Use high leverage to maximize profits", "Trade only based on news events", "Risk no more than 2% of your capital on a single trade", "Focus solely on short-term trades for quick profits"],
  answer: "Risk no more than 2% of your capital on a single trade"
},
{
  question: "According to many forex books, which trading time frame is best for swing traders?",
  options: ["1-minute chart", "15-minute chart", "4-hour or daily chart", "Weekly chart"],
  answer: "4-hour or daily chart"
},
{
  question: "What is the primary benefit of using moving averages in forex trading, as discussed in various trading books?",
  options: ["To predict future price levels", "To filter out market noise and identify trends", "To calculate volatility", "To determine economic news impact on prices"],
  answer: "To filter out market noise and identify trends"
},
{
  question: "Which trading strategy is emphasized in forex books as suitable for those who prefer to trade with the long-term trend?",
  options: ["Scalping", "Range trading", "Trend following", "Contrarian trading"],
  answer: "Trend following"
},
{
  question: "According to popular forex trading books, why is it important to develop a trading plan?",
  options: ["To ensure consistent profitability", "To avoid emotional decision-making and impulsive trades", "To reduce trading risks", "To maximize leverage and increase the number of trades"],
  answer: "To avoid emotional decision-making and impulsive trades"
},
{
  question: "Which of the following economic indicators is most likely to influence the currency value of an emerging market country during a period of rising global inflation?",
  options: ["GDP growth rate", "Consumer Price Index (CPI)", "Interest rate differential", "Unemployment rate"],
  answer: "Interest rate differential"
},
{
  question: "Which central bank's monetary policy is typically considered to have the most immediate effect on global forex markets, particularly in terms of currency strength?",
  options: ["The Federal Reserve (US)", "The European Central Bank (ECB)", "The Bank of Japan (BoJ)", "The Reserve Bank of India (RBI)"],
  answer: "The Federal Reserve (US)"
},
{
  question: "What is the impact of a 'hawkish' Federal Reserve stance on the USD in relation to emerging market currencies?",
  options: ["It would likely lead to a depreciation of the USD", "It would likely lead to an appreciation of the USD", "It would cause no significant effect on the USD", "It would lead to an appreciation of emerging market currencies"],
  answer: "It would likely lead to an appreciation of the USD"
},
{
  question: "Which of the following events would most likely trigger a short-term volatility spike in the forex markets?",
  options: ["A surprise interest rate hike by the Federal Reserve", "An expected quarterly earnings report from a major company", "A country’s unemployment rate falling to a new low", "A country’s GDP growth rate exceeding forecasts by 1%"],
  answer: "A surprise interest rate hike by the Federal Reserve"
},
{
  question: "The global forex market reacted strongly to Brexit in 2016. What was the primary reason for this volatility?",
  options: ["Concerns over the UK's trade relations with the EU and global uncertainty", "A major increase in UK economic growth", "The UK government’s sudden increase in interest rates", "The discovery of a major financial scandal involving UK banks"],
  answer: "Concerns over the UK's trade relations with the EU and global uncertainty"
},
{
  question: "In the context of the forex market, what is 'Quantitative Easing' (QE) and how does it impact currency values?",
  options: ["A policy to reduce government debt by increasing the money supply, leading to depreciation of the currency", "A policy that increases interest rates and reduces the money supply, leading to currency appreciation", "A strategy to boost exports through currency devaluation", "A form of financial regulation to curb inflationary pressures, leading to appreciation of the currency"],
  answer: "A policy to reduce government debt by increasing the money supply, leading to depreciation of the currency"
},
{
  question: "How do trade deficits in major economies typically affect their currency in the forex markets?",
  options: ["They strengthen the currency due to increased foreign investments", "They weaken the currency as more of the country’s currency is sold to purchase foreign goods", "They have no impact on the currency’s value", "They lead to immediate appreciation of the currency to correct the imbalance"],
  answer: "They weaken the currency as more of the country’s currency is sold to purchase foreign goods"
},
{
  question: "Which of the following geopolitical events would most likely lead to a 'flight to safety' in forex markets, causing demand for the US Dollar to increase?",
  options: ["A military conflict in the Middle East", "A trade war between the US and China", "An unexpected drop in global oil prices", "A significant breakthrough in international peace talks"],
  answer: "A military conflict in the Middle East"
},
{
  question: "How does the US-China trade war affect global forex markets?",
  options: ["It strengthens the US Dollar as the US economy becomes more competitive", "It causes increased volatility in global markets, leading to depreciation of the Chinese Yuan and strengthening of safe-haven currencies", "It leads to a depreciation of the US Dollar and a stronger Chinese Yuan", "It has no significant impact on forex markets"],
  answer: "It causes increased volatility in global markets, leading to depreciation of the Chinese Yuan and strengthening of safe-haven currencies"
},
{
  question: "What impact does the European Central Bank's (ECB) policy of negative interest rates have on the Euro in global forex markets?",
  options: ["It leads to a stronger Euro as borrowing costs decrease", "It leads to a weaker Euro due to less incentive for foreign investment in Eurozone assets", "It has no effect on the Euro as markets are not affected by interest rates", "It strengthens the Euro as it encourages domestic investment"],
  answer: "It leads to a weaker Euro due to less incentive for foreign investment in Eurozone assets"
},
{
  question: "Which of the following would most likely cause a significant depreciation of the Japanese Yen in the forex market?",
  options: ["A strong recovery in Japan’s GDP growth", "An increase in Japanese exports", "A decrease in Japan's interest rates", "A stronger US Dollar"],
  answer: "A decrease in Japan's interest rates"
},
{
  question: "What does the term 'currency peg' refer to in the context of forex markets?",
  options: ["A situation where a currency is allowed to fluctuate freely against others", "A policy where a currency’s value is fixed against another currency or a basket of currencies", "A strategy used to reduce volatility in the forex market", "A method for countries to protect their local currencies from devaluation"],
  answer: "A policy where a currency’s value is fixed against another currency or a basket of currencies"
},
{
  question: "Which of the following is the most accurate description of the impact of global oil price fluctuations on currencies of oil-exporting nations, such as Canada and Russia?",
  options: ["When oil prices rise, the currencies of oil-exporting nations tend to appreciate", "When oil prices rise, the currencies of oil-exporting nations tend to depreciate", "Oil price fluctuations have no effect on these currencies", "When oil prices rise, the currencies of oil-exporting nations are likely to depreciate due to increased domestic demand"],
  answer: "When oil prices rise, the currencies of oil-exporting nations tend to appreciate"
},
{
  question: "How does a central bank's decision to raise interest rates affect its national currency in the forex market?",
  options: ["It generally causes the currency to depreciate due to decreased investor interest", "It generally causes the currency to appreciate due to higher returns on investments", "It has no impact on the currency", "It causes immediate volatility without a clear trend in currency movement"],
  answer: "It generally causes the currency to appreciate due to higher returns on investments"
},
{
  question: "In the context of global forex markets, what is the likely outcome of a sovereign debt crisis in a large economy like Italy or Spain?",
  options: ["An appreciation of the euro as global investors seek stability", "A depreciation of the euro as investors fear default and capital flight", "No significant impact on the euro or global markets", "An increase in inflation and interest rates, leading to euro depreciation"],
  answer: "A depreciation of the euro as investors fear default and capital flight"
},
{
  question: "How do expectations about future Federal Reserve interest rate hikes affect the value of emerging market currencies?",
  options: ["They tend to lead to a stronger emerging market currency as global investors seek higher returns", "They tend to lead to a weaker emerging market currency as capital flows out of these economies", "They have no impact on emerging market currencies", "They lead to a strengthening of emerging market currencies due to increased global confidence"],
  answer: "They tend to lead to a weaker emerging market currency as capital flows out of these economies"
},
{
  question: "Which forex market event would likely signal a 'bullish breakout' in the EUR/USD pair?",
  options: ["A sharp increase in US unemployment data", "A dovish stance from the European Central Bank", "A strong US GDP report", "A sudden increase in demand for European exports"],
  answer: "A sudden increase in demand for European exports"
},
{
  question: "Which currency is most often used as a 'reserve currency' in central banks' foreign exchange reserves?",
  options: ["Japanese Yen", "British Pound", "Euro", "US Dollar"],
  answer: "US Dollar"
}
];
// Global variable to store selected questions
let selectedQuestions = [];

// Select 11 random quiz questions
function getRandomQuestions() {
  const shuffledQuestions = [...quizQuestions];
  shuffledQuestions.sort(() => 0.5 - Math.random()); // Randomize the order
  return shuffledQuestions.slice(0, 11); // Select 11 random questions
}

// Show quiz panel when clicking the "Quiz Mode" menu item
document.getElementById('quiz-mode').addEventListener('click', () => {
  document.getElementById('quiz-panel').style.display = 'block';
  settingContainer.style.display = "none";
  document.querySelector(".home-content").classList.add('blur');
  document.body.style.overflow = "hidden";

  // Select and store random questions
  selectedQuestions = getRandomQuestions();
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear previous content

  selectedQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    question.options.forEach((option, i) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question-${index}`;
      optionInput.value = option;
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      questionDiv.appendChild(optionLabel);
    });

    quizContainer.appendChild(questionDiv);
  });
});

// Handling quiz submission and showing results
document.getElementById('submit-quiz').addEventListener('click', () => {
  let score = 0;
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';

  selectedQuestions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);

    if (selectedOption) {
      const isCorrect = selectedOption.value === question.answer;
      if (isCorrect) {
        score++;
      }

      // Show the result for this question
      const resultText = document.createElement('p');
      resultText.innerHTML = `${index + 1}. <strong>${question.question}</strong><br>
                              Your Answer: <em>${selectedOption.value}</em><br>
                              Correct Answer: <strong>${question.answer}</strong><br><br>`;
      resultContainer.appendChild(resultText);
    } else {
      const resultText = document.createElement('p');
      resultText.innerHTML = `${index + 1}. <strong>${question.question}</strong><br>
                              Your Answer: <em>Not answered</em><br>
                              Correct Answer: <strong>${question.answer}</strong><br><br>`;
      resultContainer.appendChild(resultText);
    }
  });

  // Display the score
  const scoreText = document.createElement('p');
  scoreText.innerHTML = `<strong>Your Score: ${score} out of 11</strong>`;
  resultContainer.appendChild(scoreText);

  // Show the result panel
  document.getElementById('quiz-panel').style.display = 'none';
  document.getElementById('result-panel').style.display = 'block';
});

// Close the result panel
document.getElementById('close-result').addEventListener('click', () => {
  document.getElementById('result-panel').style.display = 'none';
  document.querySelector(".home-content").classList.remove('blur');
  backgroundBlocker.style.display = "none"; // hide background blocker
  document.body.style.overflow = "auto";
});



window.onload = () => {    
  // Hide the spinner once login status is determined
  document.getElementById('loading-spinner').style.display = 'none';
};

//forntend code
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 8;
  const showError = (message) => alert(message);

  // Handle login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      showError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      showError("Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("authToken", data.token);
        window.location.href = "/homepage.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Handle registration
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      fullName: document.getElementById("full-name").value.trim(),
      userName: document.getElementById("user-name").value.trim(),
      email: document.getElementById("signup-email").value.trim(),
      password: document.getElementById("signup-password").value.trim(),
      country: document.getElementById("country").value,
    };

    if (!formData.fullName || !formData.userName || !formData.email || !formData.password) {
      showError("All fields are required.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      showError("Enter a valid email address.");
      return;
    }
    if (!isValidPassword(formData.password)) {
      showError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "/";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Fetch profile
  async function fetchProfile() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in first.");
      window.location.href = "/";
      return;
    }

    try {
      const response = await fetch("/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User Profile:", data.data);
      } else {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          window.location.href = "/";
        } else {
          alert(data.message || "Failed to fetch profile");
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  // Redirect if already logged in
  if (window.location.pathname === "/homepage.html") {
    fetchProfile();
  }
});


//for login btn
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Check if the user is logged in by verifying the JWT in localStorage
  const token = localStorage.getItem("authToken");
  if (token) {
      loginBtn.style.display = "none"; // Hide the login button
      logoutBtn.style.display = "block"; // Show the logout button
  }

  // Handle login form submission
  document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
          const response = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          if (response.ok) {
              alert("Login successful!");

              // Save JWT token in localStorage
              localStorage.setItem("authToken", data.token);

              // Update button visibility
              loginBtn.style.display = "none"; // Hide login button
              logoutBtn.style.display = "block"; // Show logout button

              window.location.href = "/homepage.html"; // Redirect to homepage
          } else {
              alert(data.message || "Login failed");
          }
      } catch (error) {
          console.error("Error during login:", error);
          alert("An error occurred. Please try again.");
      }
  });

  // Handle logout
  logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out?")) {
          // Remove JWT token from localStorage
          localStorage.removeItem("authToken");

          // Reset button visibility
          loginBtn.style.display = "block"; // Show login button
          logoutBtn.style.display = "none"; // Hide logout button

          window.location.href = "/"; // Redirect to login page
      }
  });
});



//terms and condition
// Get elements
const openTermsLink = document.getElementById('open-terms');
const modal = document.getElementById('terms-modal');
const closeModal = document.getElementById('term-close-modal');
const checkbox = document.getElementById('terms');

// Open the modal when the user clicks the link
openTermsLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    modal.style.display = 'block'; // Show the modal
    document.getElementById("panelContainer").classList.add('blur');
});

// Close the modal when the user clicks on the close button
closeModal.addEventListener('click', function() {
    modal.style.display = 'none'; // Hide the modal
    document.getElementById("panelContainer").classList.remove('blur');
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById("panelContainer").classList.remove('blur');s
    }
});

// Disable the checkbox until the modal is read
checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        alert('You have accepted the Terms and Conditions!');
    }
});


  // Add event listeners to the cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      // Get the content container and make it visible
      const contentContainer = document.querySelector('.content-container');
      contentContainer.classList.add('visible');
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const forgotModal = document.getElementById("forgotmodal");
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    const closeModalButton = document.getElementById("close-forgot-password");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
  
    // Show the modal when the "Forgot Password" link is clicked
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      forgotModal.style.display = "flex";
    });
  
    // Close the modal when the "Close" button is clicked
    closeModalButton.addEventListener("click", () => {
      forgotModal.style.display = "none";
    });
  
    // Handle the password reset form submission
    forgotPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("forgot-email").value;
  
      // Basic email validation
      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }
  
      try {
        const response = await fetch("/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("A password reset link has been sent to your email.");
        } else {
          alert(data.message || "Failed to send reset link.");
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        alert("An error occurred. Please try again later.");
      }
  
      // Close the modal after submission
      forgotModal.style.display = "none";
    });
  });
  
  function comingSoon() {
    alert("Coming Soon!");
}