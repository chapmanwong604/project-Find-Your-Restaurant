# **Find-Your-Restaurant (AI Image Project)**

## **Overview:**

This is an **AI image-related beginner project** which can recognize **73 types of food** in different cuisines.

Simply upload a food image to find the most similar one among 73 kinds of food, then a list of nearby restaurants with related cuisines will be generated. 

(Currently, only restaurants in Tsuen Wan District can be generated)

For the types of food, a list of those 73 types is provided below.

## **Setup for the Project:**

1. Install the dependencies of requirements.txt inside a **Python** virtual environment.
    
        cd web-server/
        pip install -r requirements.txt

2. Install the dependencies in package.json.
   
        npm install

3. Follow `example.sql` to create a new **PostgreSQL** database for storing restaurants and food data.

4. Follow `example.env` to create new `.env` file for connection to database.

5. Run **Knex** `migration` and `seed` to create tables and required data of the database.
   
        npx knex migrate:latest
    
        npx knex seed:run

6. Activate the **Python** virtual environment and run the **Sanic** server.
   
        python app.py

7. Run the **Express** server.
   
        npm start

    or

        npx ts-node main.ts
    
8. Go to http://localhost:8000/ and try it out!

## **Food List:**

|Name of Food           |Chinese Name of Food|
|-----------------------|--------------------|
|apple_pie	        |蘋果批|
|baby_back_ribs	        |豬肋骨|
|barbecue_pork	        |港式叉燒|
|beet_salad	        |紅菜頭沙律|
|bibimbap	        |韓式拌飯|
|breakfast_burrito	|墨西哥捲餅|
|bubble_tea	        |珍珠奶茶|
|caesar_salad	        |凱撒沙律|
|carrot_cake	        |紅蘿蔔蛋糕|
|cheesecake	        |芝士蛋糕|
|chicken_curry	        |咖喱雞|
|chicken_quesadilla	|墨西哥芝士餡餅|
|chicken_wings	        |雞翼|
|chocolate_cake	        |朱古力蛋糕|
|clam_chowder	        |周打蜆湯|
|club_sandwich	        |公司三文冶|
|congee	                |粥|
|crab_cakes	        |蟹餅|
|cup_cakes	        |紙杯蛋糕|
|donuts	                |冬甩|
|dumplings	        |小籠包|
|edamame	        |日式枝豆|
|egg_tart	        |蛋撻|
|eggs_benedict	        |班尼迪蛋|
|escargots	        |法式蝸牛|
|fish_and_chips	        |炸魚薯條|
|french_fries	        |薯條|
|fried_beef_noodles	|乾炒牛河|
|fried_calamari	        |炸魷魚|
|fried_rice	        |炒飯|
|frozen_yogurt	        |乳酪|
|garlic_bread	        |蒜蓉包|
|greek_salad	        |希臘沙律|
|grilled_salmon	        |燒三文魚|
|gyoza	                |煎餃|
|hamburger	        |漢堡包|
|hk_french_toast	|西多士|
|hot_and_sour_soup	|酸辣湯|
|hot_dog	        |熱狗|
|hot_pot	        |火鍋|
|ice_cream	        |雪糕|
|lasagna	        |焗千層麵|
|lobster_bisque	        |龍蝦湯|
|macaroni_and_cheese	|芝士通心粉|
|macarons	        |馬卡龍|
|miso_soup	        |麵豉湯|
|mussels	        |青口|
|omelette	        |奄列|
|onion_rings	        |洋葱圈|
|oysters	        |蠔|
|pad_thai	        |泰式炒金邊粉|
|pancakes	        |熱香餅|
|peking_duck	        |北京片皮鴨|
|pho	                |越南河|
|pizza	                |薄餅|
|ramen	                |日式拉麵|
|rice_noodle	        |米線|
|rice_roll	        |腸粉|
|risotto	        |意大利飯|
|samosa	                |印度咖喱餃|
|sashimi	        |刺身|
|satay_beef_noodle	|沙嗲牛肉麵|
|scallops	        |帶子|
|seaweed_salad	        |中華沙律|
|siu_mai	        |燒賣|
|spaghetti_bolognese	|肉醬意大利麵|
|spaghetti_carbonara	|卡邦尼意大利麵|
|spring_rolls	        |春卷|
|steak	                |牛扒|
|strawberry_shortcake	|士多啤梨蛋糕|
|sushi	                |壽司|
|tiramisu	        |意大利芝士蛋糕|
|waffles	        |窩夫|

## **Contributors:**

-   William Chi
-   Hang Tsui
-   Chapman Wong