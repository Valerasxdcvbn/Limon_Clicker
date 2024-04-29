let count = 0;  // Основной счетчик
let awards = 1; // Прибавление за 1 один клик
let lvl = 0; // уровень
let cost_buy_gardener = 1000 // цена покупки садовника
let lvl_upgrade1 = 0; // лвл улучшения1
let lvl_buy_gardener = 0; // лвл улучшения садовника
const priceIncrease = 500; // Сумма увеличения цены на садовника после каждой покупки
let gardenerInterval = null; // переменная для хранения интервала
let intervalDuration = 5000; // начальное значение длительности интервала в мс (10 секунд)
const priceIncreasePercent = 10; // Увеличение цены на 10% после покупки
const base_cost = 100; // базовая стоимость улучшения
const cost_growth_rate = 1.07; // базовый процент роста стоимости
let cost_multiplier = 1.1; // базовый множитель стоимости
let cost_upgrade = base_cost;


// Функция действие при клике
function incrementCounter() {
    // Увеличиваем счетчик
    count += awards;
    // Обновляем текст в элементе с id="counter"
    document.getElementById("counter").innerText = Math.floor(count);
    document.getElementById("costupgrade").innerText = Math.floor(cost_upgrade);
    document.getElementById("lvl_main").innerText = 'Уровень' + lvl;
    document.getElementById("cost_buy_gardener").innerText = Math.floor(cost_buy_gardener);
    console.log('Цена улучшения: ', cost_upgrade, 'Цена покупки садовника:=', cost_buy_gardener,'За один клик: ',awards, 'ЛВЛ:',lvl, 'Уровень 1 улучшения: ',lvl_upgrade1, 'уровень садовника:=', lvl_buy_gardener);
    if (lvl == 15) {
        showTemporaryMessage('+ 150 000 лимонов за 15 lvl')
        count = count + 150000
    }
}

// купить улучшение
function buy_upgrade1() {
    if (lvl_upgrade1 > 9){
        showTemporaryMessage('Максимальный уровень улучшения', 2000);
    }
    else if (count >= cost_upgrade){
        count -= cost_upgrade;
        cost_upgrade = cost_upgrade * cost_multiplier; // увеличиваем стоимость на 10%
        document.getElementById("counter").innerText = Math.floor(count);
        showTemporaryMessage('Покупка успешна', 2000);
        lvl += 1;
        document.getElementById("costupgrade").innerText = Math.floor(cost_upgrade)
        document.getElementById("lvl_main").innerText = lvl;
        lvl_upgrade1 += 1;
        updateCost();
        updateAwards();
        achievementBonus;
        specialEventCheck;
        if (lvl_upgrade1 == 7) {
            showTemporaryMessage('C достижением 7 lvl сбора лимонов каждая покупка улучшения улучшает сбор лимонов в 2 раза', 5000);
        }
        if (lvl_upgrade1 >= 7){
                awards = awards * 2
            }
        if (lvl == 10) {
            let eventActive = true
            showTemporaryMessage('Скидка 50% на улучшение', 2000);
        }
        if (awards > 4) {
            awards += 5;
        }
        else {
            awards += 1;
        }
    }
    else {
        showTemporaryMessage('Денюжки мало', 2000);
    }
}

// Функции после покупки садовника
function startGardenerInterval() {
    // Если интервал уже установлен, очистим его
    if (gardenerInterval !== null) clearInterval(gardenerInterval);
    gardenerInterval = setInterval(() => {
        count += 1; // увеличиваем count каждый интервал
        document.getElementById("counter").innerText = Math.floor(count);; // обновляем значение count на странице
    }, intervalDuration);
}


// купить садовника
let flag_gardener = false;
function buy_gardener() {
    if (lvl_buy_gardener > 9){
        showTemporaryMessage('Максимальный уровень улучшения', 2000);
    }
    else if (lvl >= 5) {
        if (count >= cost_buy_gardener) {
            flag_gardener = true
            lvl += 1
            document.getElementById("cost_buy_gardener").innerText = Math.floor(cost_buy_gardener)
            document.getElementById("counter").innerText = Math.floor(count);
            showTemporaryMessage('Покупка успешна', 2000);
            document.getElementById("lvl_main").innerText = lvl;
            lvl_buy_gardener += 1;
            intervalDuration -= 1000;
            startGardenerInterval()
            count -= cost_buy_gardener;
            document.getElementById("cost_buy_gardener").innerText = Math.floor(cost_buy_gardener);

            startGardenerInterval(); // обновляем интервал с новой длительностью

            showTemporaryMessage('Покупка успешна', 2000);
            document.getElementById("lvl_main").innerText = lvl;
            cost_buy_gardener += cost_buy_gardener + (cost_buy_gardener * 0.10 ); // увеличиваем стоимость на 10
        }
        else {
            showTemporaryMessage('Денюжки мало', 2000);
        }
    }}

document.addEventListener('DOMContentLoaded', function() {
    // Получаем доступ к элементам и навешиваем обработчики событий
    var incrementButton = document.getElementById('incrementButton');
    var upgradeButton = document.getElementById('buyUpgrade1Button');

    if (incrementButton) {
        incrementButton.onclick = incrementCounter;
    }

    if (upgradeButton) {
        upgradeButton.onclick = buy_upgrade1;
    }
})


// Функция Вывода временого сообщения Функция принимает текст и время вывода 1000 = 1 сек
function showTemporaryMessage(message, duration) {
    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.style.position = 'absolute';
    messageElement.style.top = '60%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.backgroundColor = 'white';
    messageElement.style.color = 'Gray';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '1000';
    document.body.appendChild(messageElement);
    setTimeout(function() {
        messageElement.remove();
    }, duration);
}

// Функция обновления стоимости
function updateCost() {
    cost_multiplier *= cost_growth_rate;
    cost_upgrade = cost_upgrade * cost_multiplier;
}


// Функция обновления наград
function updateAwards() {
        if (lvl_upgrade1 >= 5) {
            awards += Math.floor(Math.random() * 5) + 5; // случайная награда от 5 до 9 после 5-го уровня
        } else {
            awards += Math.floor(Math.random() * 3) + 1; // случайная награда от 1 до 3 до 5-го уровня
        }
    }


// Функция бонуса за достижения
function achievementBonus() {
        if (lvl_upgrade1 % 5 === 0) {
            count += base_cost * 10; // бонусное количество очков
            showTemporaryMessage('Бонус за достижение!', 2000);
        }
    }


// Функция специального события
let eventActive = false; // флаг активности события
function specialEventCheck() {
        if (eventActive) {
            cost_buy_gardener /= 2; // скидка 50% на стоимость улучшения
        }
    }


// Функция для добавления флуктуирующих цен
function fluctuatingPrices() {
    let fluctuation = (Math.random() - 0.5) * base_cost * 0.1; // случайное колебание в 10% от базовой цены
    cost_upgrade += fluctuation;
    }



// Получаем элемент кнопки и элемент для всплывающего сообщения
var upgradeButton = document.getElementById("buy_upgrade");
var tooltip_upgrade = document.getElementById("tooltip_buy_upgrade");

// Добавляем обработчик события 'mouseover' для показа всплывающего сообщения
upgradeButton.addEventListener("mouseover", function() {
    tooltip_upgrade.style.display = "block";
  document.getElementById('tooltip_buy_upgrade').textContent = 'Увеличивает кол-во лимонов за один сбор, уровень улучшения: ' + lvl_upgrade1
});

// Добавляем обработчик события 'mouseout' для скрытия всплывающего сообщения
upgradeButton.addEventListener("mouseout", function() {
    tooltip_upgrade.style.display = "none"; // Скрываем всплывающее сообщение
});


var gardener_button = document.getElementById("buy_gardener_id");
var tooltip_gardener = document.getElementById("tooltip_buy_gardener_id");

// Добавляем обработчик события 'mouseover' для показа всплывающего сообщения
gardener_button.addEventListener("mouseover", function() {
    tooltip_gardener.style.display = "block";
  document.getElementById('tooltip_buy_gardener_id').textContent = 'Открываеться с 5 уровня, дает регулярное прибавление лимонов, уровень улучшения: ' + lvl_buy_gardener
});

// Добавляем обработчик события 'mouseout' для скрытия всплывающего сообщения
gardener_button.addEventListener("mouseout", function() {
    tooltip_gardener.style.display = "none"; // Скрываем всплывающее сообщение
});
