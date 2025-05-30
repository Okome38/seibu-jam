// ========================================================================
// Enhanced Site JavaScript - 福井高専寮管理システム (統合版)
// ========================================================================

// 天気コードマッピング
const weatherCode = {
    100: ["100.svg", "500.svg", "晴れ"],
    101: ["101.svg", "501.svg", "晴れ時々曇り"],
    102: ["102.svg", "502.svg", "晴れ一時雨"],
    103: ["102.svg", "502.svg", "晴れ時々雨"],
    104: ["104.svg", "504.svg", "晴れ一時雪"],
    105: ["104.svg", "504.svg", "晴れ時々雪"],
    106: ["102.svg", "502.svg", "晴れ一時雨か雪"],
    107: ["102.svg", "502.svg", "晴れ時々雨か雪"],
    108: ["102.svg", "502.svg", "晴れ一時雨か雷雨"],
    110: ["110.svg", "510.svg", "晴れ後時々曇り"],
    111: ["110.svg", "510.svg", "晴れ後曇り"],
    112: ["112.svg", "512.svg", "晴れ後一時雨"],
    113: ["112.svg", "512.svg", "晴れ後時々雨"],
    114: ["112.svg", "512.svg", "晴れ後雨"],
    115: ["115.svg", "515.svg", "晴れ後一時雪"],
    116: ["115.svg", "515.svg", "晴れ後時々雪"],
    117: ["115.svg", "515.svg", "晴れ後雪"],
    118: ["112.svg", "512.svg", "晴れ後雨か雪"],
    119: ["112.svg", "512.svg", "晴れ后雨か雷雨"],
    120: ["102.svg", "502.svg", "晴れ朝夕一時雨"],
    121: ["102.svg", "502.svg", "晴れ朝の内一時雨"],
    122: ["112.svg", "512.svg", "晴れ夕方一時雨"],
    123: ["100.svg", "500.svg", "晴れ山沿い雷雨"],
    124: ["100.svg", "500.svg", "晴れ山沿い雪"],
    125: ["112.svg", "512.svg", "晴れ午後は雷雨"],
    126: ["112.svg", "512.svg", "晴れ昼頃から雨"],
    127: ["112.svg", "512.svg", "晴れ夕方から雨"],
    128: ["112.svg", "512.svg", "晴れ夜は雨"],
    130: ["100.svg", "500.svg", "朝の内霧後晴れ"],
    131: ["100.svg", "500.svg", "晴れ明け方霧"],
    132: ["101.svg", "501.svg", "晴れ朝夕曇り"],
    140: ["102.svg", "502.svg", "晴れ時々雨と雷"],
    160: ["104.svg", "504.svg", "晴れ一時雪か雨"],
    170: ["104.svg", "504.svg", "晴れ時々雪か雨"],
    181: ["115.svg", "515.svg", "晴れ後雪か雨"],
    200: ["200.svg", "200.svg", "曇り"],
    201: ["201.svg", "601.svg", "曇り時々晴れ"],
    202: ["202.svg", "202.svg", "曇り一時雨"],
    203: ["202.svg", "202.svg", "曇り時々雨"],
    204: ["204.svg", "204.svg", "曇り一時雪"],
    205: ["204.svg", "204.svg", "曇り時々雪"],
    206: ["202.svg", "202.svg", "曇り一時雨か雪"],
    207: ["202.svg", "202.svg", "曇り時々雨か雪"],
    208: ["202.svg", "202.svg", "曇り一時雨か雷雨"],
    209: ["200.svg", "200.svg", "霧"],
    210: ["210.svg", "610.svg", "曇り後時々晴れ"],
    211: ["210.svg", "610.svg", "曇り後晴れ"],
    212: ["212.svg", "212.svg", "曇り後一時雨"],
    213: ["212.svg", "212.svg", "曇り後時々雨"],
    214: ["212.svg", "212.svg", "曇り後雨"],
    215: ["215.svg", "215.svg", "曇り後一時雪"],
    216: ["215.svg", "215.svg", "曇り後時々雪"],
    217: ["215.svg", "215.svg", "曇り後雪"],
    218: ["212.svg", "212.svg", "曇り後雨か雪"],
    219: ["212.svg", "212.svg", "曇り後雨か雷雨"],
    220: ["202.svg", "202.svg", "曇り朝夕一時雨"],
    221: ["202.svg", "202.svg", "曇り朝の内一時雨"],
    222: ["212.svg", "212.svg", "曇り夕方一時雨"],
    223: ["201.svg", "601.svg", "曇り日中時々晴れ"],
    224: ["212.svg", "212.svg", "曇り昼頃から雨"],
    225: ["212.svg", "212.svg", "曇り夕方から雨"],
    226: ["212.svg", "212.svg", "曇り夜は雨"],
    228: ["215.svg", "215.svg", "曇り昼頃から雪"],
    229: ["215.svg", "215.svg", "曇り夕方から雪"],
    230: ["215.svg", "215.svg", "曇り夜は雪"],
    231: ["200.svg", "200.svg", "曇り海岸霧か霧雨"],
    240: ["202.svg", "202.svg", "曇り時々雨と雷"],
    250: ["204.svg", "204.svg", "曇り時々雪と雷"],
    260: ["204.svg", "204.svg", "曇り一時雪か雨"],
    270: ["204.svg", "204.svg", "曇り時々雪か雨"],
    281: ["215.svg", "215.svg", "曇り後雪か雨"],
    300: ["300.svg", "300.svg", "雨"],
    301: ["301.svg", "701.svg", "雨時々晴れ"],
    302: ["302.svg", "302.svg", "雨時々止む"],
    303: ["303.svg", "303.svg", "雨時々雪"],
    304: ["300.svg", "300.svg", "雨か雪"],
    306: ["300.svg", "300.svg", "大雨"],
    308: ["308.svg", "308.svg", "雨で暴風を伴う"],
    309: ["303.svg", "303.svg", "雨一時雪"],
    311: ["311.svg", "711.svg", "雨後晴れ"],
    313: ["313.svg", "313.svg", "雨後曇り"],
    314: ["314.svg", "314.svg", "雨後時々雪"],
    315: ["314.svg", "314.svg", "雨後雪"],
    316: ["311.svg", "711.svg", "雨か雪後晴れ"],
    317: ["313.svg", "313.svg", "雨か雪後曇り"],
    320: ["311.svg", "711.svg", "朝の内雨後晴れ"],
    321: ["313.svg", "313.svg", "朝の内雨後曇り"],
    322: ["303.svg", "303.svg", "雨朝晩一時雪"],
    323: ["311.svg", "711.svg", "雨昼頃から晴れ"],
    324: ["311.svg", "711.svg", "雨夕方から晴れ"],
    325: ["311.svg", "711.svg", "雨夜は晴れ"],
    326: ["314.svg", "314.svg", "雨夕方から雪"],
    327: ["314.svg", "314.svg", "雨夜は雪"],
    328: ["300.svg", "300.svg", "雨一時強く降る"],
    329: ["300.svg", "300.svg", "雨一時みぞれ"],
    340: ["400.svg", "400.svg", "雪か雨"],
    350: ["300.svg", "300.svg", "雨で雷を伴う"],
    361: ["411.svg", "811.svg", "雪か雨後晴れ"],
    371: ["413.svg", "413.svg", "雪か雨後曇り"],
    400: ["400.svg", "400.svg", "雪"],
    401: ["401.svg", "801.svg", "雪時々晴れ"],
    402: ["402.svg", "402.svg", "雪時々止む"],
    403: ["403.svg", "403.svg", "雪時々雨"],
    405: ["400.svg", "400.svg", "大雪"],
    406: ["406.svg", "406.svg", "風雪強い"],
    407: ["406.svg", "406.svg", "暴風雪"],
    409: ["403.svg", "403.svg", "雪一時雨"],
    411: ["411.svg", "811.svg", "雪後晴れ"],
    413: ["413.svg", "413.svg", "雪後曇り"],
    414: ["414.svg", "414.svg", "雪後雨"],
    420: ["411.svg", "811.svg", "朝の内雪後晴れ"],
    421: ["413.svg", "413.svg", "朝の内雪後曇り"],
    422: ["414.svg", "414.svg", "雪昼頃から雨"],
    423: ["414.svg", "414.svg", "雪夕方から雨"],
    425: ["400.svg", "400.svg", "雪一時強く降る"],
    426: ["400.svg", "400.svg", "雪後みぞれ"],
    427: ["400.svg", "400.svg", "雪一時みぞれ"],
    450: ["400.svg", "400.svg", "雪で雷を伴う"],
};

const dayList = ["日", "月", "火", "水", "木", "金", "土"];

// デフォルトの混雑度データ
const baseCongestion = [
    { time: "17時", percent: 10 },
    { time: "18時", percent: 50 },
    { time: "19時", percent: 70 },
    { time: "20時", percent: 40 },
    { time: "21時", percent: 50 },
    { time: "22時", percent: 30 },
    { time: "23時", percent: 20 }
];

// ========================================================================
// 既存の混雑度グラフ作成関数（保持）
// ========================================================================
function createCongestionChart(weatherData = null) {
    let adjustedCongestion = [...baseCongestion];
    
    if (weatherData) {
        const currentDate = new Date(weatherData.date);
        const dayOfWeek = currentDate.getDay();
        
        // 金土日の場合は混雑度を下げる
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
            adjustedCongestion = adjustedCongestion.map(item => ({
                time: item.time,
                percent: Math.round(item.percent * 0.2)
            }));
        } else if (weatherData.telop && weatherData.telop.includes("雨")) {
            // 雨の場合は早い時間にシフト
            for (let i = 2; i > 0; i--) {
                const movePercent = Math.min(20, adjustedCongestion[i].percent);
                adjustedCongestion[i].percent -= movePercent;
                adjustedCongestion[i - 1].percent += movePercent;
            }
        }
    }
    
    const labels = adjustedCongestion.map(item => item.time);
    const data = adjustedCongestion.map(item => item.percent);
    
    const ctx = document.getElementById('congestionChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '混雑度（%）',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 10 }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    }
}

// ========================================================================
// 既存の天気データ取得関数（保持）
// ========================================================================
async function fetchWeatherData() {
    try {
        const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/180000.json";
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('天気データの取得に失敗しました');
        }
        
        const weather = await response.json();
        
        // 地域名を表示
        const locationElement = document.getElementById("location");
        if (locationElement && weather[1]) {
            locationElement.innerHTML = 
                `${weather[1].publishingOffice}: ${weather[1].timeSeries[0].areas[0].area.name} ` +
                `<a href="https://www.jma.go.jp/bosai/forecast/" target="_blank">気象庁のデータを元に作成</a>`;
        }
        
        // 天気予報を表示
        displayWeatherForecast(weather);
        
        // 現在の天気データを取得
        const currentWeatherData = getCurrentWeatherData(weather);
        
        // 混雑度グラフを作成
        createCongestionChart(currentWeatherData);
        
        // 天気エフェクトを追加
        if (window.weatherAnimations) {
            window.weatherAnimations.addWeatherParticles(getWeatherType(currentWeatherData.telop));
        }
        
    } catch (error) {
        console.error('天気データの取得エラー:', error);
        
        // エラー時は現在の日付で基本の混雑度グラフを表示
        const currentWeatherText = document.getElementById("currentWeatherText");
        if (currentWeatherText) {
            currentWeatherText.textContent = "天気データの取得に失敗しました。基本の混雑度を表示しています。";
        }
        
        createCongestionChart();
    }
}

// ========================================================================
// 既存の天気予報表示関数（保持）
// ========================================================================
function displayWeatherForecast(weather) {
    const weatherForecast = document.getElementById("weatherForecast");
    if (!weatherForecast) return;
    
    // 既存の天気アイテムをクリア
    weatherForecast.innerHTML = '';
    
    try {
        const weatherCodes = weather[0].timeSeries[0].areas[0].weatherCodes;
        const timeDefines = weather[0].timeSeries[0].timeDefines;
        
        // 気温データを取得
        let tempData = null;
        try {
            tempData = weather[0].timeSeries[2];
        } catch (e) {
            console.log('気温データが見つかりません:', e);
        }
        
        // 最初の2日分を表示
        for (let i = 0; i < Math.min(2, weatherCodes.length); i++) {
            const temperatures = getTemperatureData(tempData, i);
            const weatherItem = createWeatherItem(weatherCodes[i], timeDefines[i], temperatures);
            weatherForecast.appendChild(weatherItem);
        }
    } catch (error) {
        console.error('天気予報の表示エラー:', error);
        weatherForecast.innerHTML = '<div class="weather-item">天気データの表示に失敗しました</div>';
    }
}

// ========================================================================
// 既存のヘルパー関数（保持）
// ========================================================================
function getTemperatureData(tempData, dayIndex) {
    if (!tempData || !tempData.areas || !tempData.areas[0]) {
        return { min: "--", max: "--" };
    }
    
    try {
        const area = tempData.areas[0];
        let minTemp = "--";
        let maxTemp = "--";
        
        // 最高気温
        if (area.tempsMax && area.tempsMax[dayIndex] !== null && area.tempsMax[dayIndex] !== undefined) {
            maxTemp = area.tempsMax[dayIndex];
        }
        
        // 最低気温
        if (area.tempsMin && area.tempsMin[dayIndex] !== null && area.tempsMin[dayIndex] !== undefined) {
            minTemp = area.tempsMin[dayIndex];
        }
        
        return { min: minTemp, max: maxTemp };
    } catch (error) {
        console.error('気温データの取得エラー:', error);
        return { min: "--", max: "--" };
    }
}

function createWeatherItem(weatherCodeValue, timeDefine, temperatures = { min: "--", max: "--" }) {
    const weatherItem = document.createElement('div');
    weatherItem.className = 'weather-item';
    
    const dt = new Date(timeDefine);
    const weekdayCount = dt.getDay();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    
    const weatherInfo = weatherCode[weatherCodeValue] || ["", "", "不明"];
    
    weatherItem.innerHTML = `
        <div class="date" style="color: ${weekdayCount === 0 ? 'red' : weekdayCount === 6 ? 'blue' : 'black'}">
            ${month}/${day}(${dayList[weekdayCount]})
        </div>
        <img class="weather-img" src="https://www.jma.go.jp/bosai/forecast/img/${weatherInfo[0]}" alt="${weatherInfo[2]}">
        <div class="weather-telop">${weatherInfo[2]}</div>
        <div><span class="temp-min">${temperatures.min}℃</span>/<span class="temp-max">${temperatures.max}℃</span></div>
    `;
    
    return weatherItem;
}

function getCurrentWeatherData(weather) {
    try {
        const weatherCodes = weather[0].timeSeries[0].areas[0].weatherCodes;
        const timeDefines = weather[0].timeSeries[0].timeDefines;
        
        const currentWeatherData = {
            date: timeDefines[0],
            telop: weatherCode[weatherCodes[0]] ? weatherCode[weatherCodes[0]][2] : "不明",
            tempMin: "--",
            tempMax: "--"
        };
        
        // 現在の天気テキストを表示
        const currentWeatherText = document.getElementById("currentWeatherText");
        if (currentWeatherText) {
            currentWeatherText.textContent = 
                `現在の天気: ${currentWeatherData.telop} (${new Date(currentWeatherData.date).toLocaleDateString()})`;
        }
        
        return currentWeatherData;
        
    } catch (error) {
        console.error('現在の天気データ取得エラー:', error);
        return null;
    }
}

// ========================================================================
// 新機能：天気タイプ判定関数
// ========================================================================
function getWeatherType(telop) {
    if (!telop) return 'clear';
    if (telop.includes('雨')) return 'rain';
    if (telop.includes('雪')) return 'snow';
    if (telop.includes('曇')) return 'cloudy';
    return 'clear';
}

// 後方互換性のための関数（paste.txtで参照されている）
function updateWeatherDisplay() {
    fetchWeatherData();
}

function getWeatherImage(weather) {
    if (!weather || !weatherCode[weather.code]) {
        return "default.svg";
    }
    return weatherCode[weather.code][0];
}

// ========================================================================
// Enhanced Weather Animation System
// ========================================================================
class WeatherAnimations {
    constructor() {
        this.initWeatherEffects();
    }
    
    initWeatherEffects() {
        // Add subtle animations to weather cards
        const weatherItems = document.querySelectorAll('.weather-item');
        weatherItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-up');
            
            // Add hover tilt effect
            item.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-4px) rotateY(5deg)';
                e.target.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) rotateY(0)';
            });
        });
    }
    
    addWeatherParticles(weatherType) {
        const container = document.querySelector('.weather-section') || document.querySelector('main');
        if (!container) return;
        
        // Remove existing particles
        const existingParticles = container.querySelectorAll('.weather-particle');
        existingParticles.forEach(p => p.remove());
        
        if (weatherType === 'rain' || weatherType === 'snow') {
            this.createParticles(container, weatherType);
        }
    }
    
    createParticles(container, type) {
        const particleCount = 15;
        const particles = [];
        
        // Ensure container has relative positioning for particles
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `weather-particle ${type}-particle`;
            particle.style.cssText = `
                position: absolute;
                width: ${type === 'snow' ? '4px' : '2px'};
                height: ${type === 'snow' ? '4px' : '12px'};
                background: ${type === 'snow' ? '#fff' : 'rgba(59, 130, 246, 0.7)'};
                border-radius: ${type === 'snow' ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: ${0.6 + Math.random() * 0.4};
                animation: fall${type} ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 1;
            `;
            
            container.appendChild(particle);
            particles.push(particle);
        }
        
        // Clean up particles after animation
        setTimeout(() => {
            particles.forEach(p => {
                if (p.parentNode) p.parentNode.removeChild(p);
            });
        }, 10000);
    }
}

// ========================================================================
// Enhanced UI Interactions
// ========================================================================
class UIEnhancements {
    constructor() {
        this.initScrollEffects();
        this.initCounterAnimations();
        this.initFormEnhancements();
        this.initTooltips();
        this.initProgressBars();
    }
    
    initScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all cards and major sections
        document.querySelectorAll('.card, .weather-section, .congestion-section, .bulletin-section').forEach(el => {
            observer.observe(el);
        });
    }
    
    initCounterAnimations() {
        // Animate numbers when they come into view
        const counters = document.querySelectorAll('.display-1, .display-4, .counter-number');
        
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent) || 0;
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    initFormEnhancements() {
        // Enhanced form interactions
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(control => {
            // Floating label effect
            control.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation styling
            control.addEventListener('input', (e) => {
                const isValid = e.target.checkValidity();
                e.target.classList.toggle('is-valid', isValid && e.target.value);
                e.target.classList.toggle('is-invalid', !isValid && e.target.value);
            });
        });
    }
    
    initTooltips() {
        // Add tooltips to interactive elements
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip);
            element.addEventListener('mouseleave', this.hideTooltip);
        });
    }
    
    showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        e.target._tooltip = tooltip;
    }
    
    hideTooltip(e) {
        if (e.target._tooltip) {
            e.target._tooltip.remove();
            delete e.target._tooltip;
        }
    }
    
    initProgressBars() {
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(bar);
        });
    }
}

// Enhanced Congestion Chart Improvements
class CongestionEnhancements {
    constructor() {
        this.initChartEnhancements();
    }
    
    initChartEnhancements() {
        const chartContainer = document.getElementById('congestionChart');
        if (!chartContainer) return;
        
        // Add loading state
        this.showChartLoading(chartContainer);
        
        // Simulate data loading (replace with actual data loading)
        setTimeout(() => {
            this.hideChartLoading(chartContainer);
            this.addChartInteractions();
        }, 1000);
    }
    
    showChartLoading(container) {
        const loader = document.createElement('div');
        loader.className = 'chart-loader';
        loader.innerHTML = `
            <div class="loading-spinner"></div>
            <p>混雑度データを読み込み中...</p>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: var(--text-secondary);
        `;
        
        container.style.position = 'relative';
        container.appendChild(loader);
    }
    
    hideChartLoading(container) {
        const loader = container.querySelector('.chart-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }
    
    addChartInteractions() {
        // Add hover effects to chart elements
        const chartElements = document.querySelectorAll('#congestionChart path, #congestionChart rect');
        
        chartElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.transition = 'all 0.2s ease';
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.target.style.filter = 'brightness(1)';
            });
        });
    }
}

// Enhanced Bulletin Board Features
class BulletinEnhancements {
    constructor() {
        this.initBulletinEffects();
    }
    
    initBulletinEffects() {
        const posts = document.querySelectorAll('.post-item');
        
        posts.forEach((post, index) => {
            // Staggered animation
            post.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effect
            post.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateX(8px) scale(1.02)';
                e.target.style.boxShadow = 'var(--shadow-lg)';
            });
            
            post.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateX(0) scale(1)';
                e.target.style.boxShadow = 'var(--shadow-md)';
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.debounceScrollEvents();
    }
    
    initLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initImageOptimization() {
        // Add loading states for images
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.style.opacity = '0.5';
                img.title = '画像の読み込みに失敗しました';
            });
        });
    }
    
    debounceScrollEvents() {
        // Optimize scroll event performance
        let ticking = false;
        
        function updateScrollEffects() {
            // Your scroll-based effects here
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancements {
    constructor() {
        this.initKeyboardNavigation();
        this.initAriaLabels();
        this.initFocusManagement();
    }
    
    initKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    initAriaLabels() {
        // Add missing aria-labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'ボタン');
            }
        });
    }
    
    initFocusManagement() {
        // Manage focus for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const focusableElements = node.querySelectorAll('button, a, input, select, textarea, [tabindex]');
                            focusableElements.forEach(el => {
                                if (!el.hasAttribute('tabindex')) {
                                    el.setAttribute('tabindex', '0');
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhancement classes
    const weatherAnimations = new WeatherAnimations();
    const uiEnhancements = new UIEnhancements();
    const congestionEnhancements = new CongestionEnhancements();
    const bulletinEnhancements = new BulletinEnhancements();
    const performanceOptimizer = new PerformanceOptimizer();
    const accessibilityEnhancements = new AccessibilityEnhancements();
    
    // Add global CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fallrain {
            to {
                transform: translateY(calc(100vh + 10px));
            }
        }
        
        @keyframes fallsnow {
            to {
                transform: translateY(calc(100vh + 10px)) translateX(20px);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
        }
        
        img {
            transition: opacity 0.3s ease;
        }
        
        .form-group.focused .form-label {
            color: var(--primary-color);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    console.log('福井高専寮管理システム - UI拡張機能が読み込まれました');
});

// Export functions for global use (maintain compatibility)
window.updateWeatherDisplay = updateWeatherDisplay;
window.getWeatherImage = getWeatherImage;
