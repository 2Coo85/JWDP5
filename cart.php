<!doctype html>
<html lang="en">
    <head>
        <meta content="Create your customized vintage teddy bear today.">
        <meta charset="utf-8">
        <title>Vintage Teddy Bears >> Shopping Cart</title>
        
        <link href="style.css" rel="stylesheet">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Calligraffitti&family=Roboto:ital@1&display=swap');
        </style>
        
        <script src="controllers/teddy.js"></script>
        <script src="models/Teddy.js"></script>
        <script src="routes/teddy.js"></script>
    </head>
    <body>
        <div class="mainContainer">
            <header class="title-header">
                <img src="images/teddy-bear.png" alt="cartoon image of teddy bear">Handmade Teddy Bears
            </header>
            <nav class="nav">
                <ul>
                    <li><a href="index.html">Home >> </a></li>
                    <li><a href="cart.php"> Cart</a></li>
                </ul>
            </nav>
            <main>
                <header class="page-header">
                    <h1>Product Selection</h1>
                </header>
                <div class="main-content">
                        <div class="products">
                            <img src="images/teddy_1.jpg" width="150">
                            <h4>Chubby Teddy</h4>
                            <h5>$25</h5>
                            <button type="submit" name="addToCart" class="cart-button">Add To Cart</button>
                        </div>
                        <div class="products">
                            <img src="images/teddy_2.jpg" width="150">
                            <h4>Small Teddy</h4>
                            <h5>$20</h5>
                            <button type="submit" name="addToCart" class="cart-button">Add To Cart</button>
                        </div>
                        <div class="products">
                            <img src="images/teddy_3.jpg" width="150">
                            <h4>Buddy Teddies</h4>
                            <h5>$45</h5>
                            <button type="submit" name="addToCart" class="cart-button">Add To Cart</button>
                        </div>
                        <div class="products">
                            <img src="images/teddy_4.jpg" width="150">
                            <h4>I "Heart" Teddy</h4>
                            <h5>$30</h5>
                            <button type="submit" name="addToCart" class="cart-button">Add To Cart</button>
                        </div>
                        <div class="products">
                            <img src="images/teddy_5.jpg" width="150">
                            <h4>Mini Teddy</h4>
                            <h5>$15</h5><button type="submit" name="addToCart" class="cart-button">Add To Cart</button>
                        </div>
                </div>
            </main>
        </div>
    </body>
</html>