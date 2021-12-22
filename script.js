$(() => {


    let cryptoSelectArr = [];
    let localCrypto;
    let cryptoSymbol = [];

    let cryptoForGraph0 = [];
    let cryptoForGraph1 = [];
    let cryptoForGraph2 = [];
    let cryptoForGraph3 = [];
    let cryptoForGraph4 = [];
    let currentTime = [];


    $.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=10`, cryptos => {
        console.log(cryptos)
        if (localStorage.getItem("localCrypto")) {
            localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        } else {
            localStorage.setItem("localCrypto", JSON.stringify(cryptos))
            localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        }

        for (const crypto of localCrypto) {

            CryptoDraw(crypto)

        }

    })

    //==========Drowing a crypto card function =====///
    function CryptoDraw(crypto) {

        $(".container").append(`    
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <label class="switch">
                                <input type="checkbox" id="${crypto.id}-switch" class="checswitch">
                                <span class="slider round"></span>
                            </label>
                            <h3 class="card-title">${crypto.symbol}</h3>
                            <p>${crypto.id}</p>
                            <button id="btn${crypto.id}" class="btn btn-primary">More Info</button>
                            <div id="${crypto.id}" class="moreInfo">  </div> 
                        </div>
                    </div>
                </div>
            </div>
        `)

        //==== More Info Button===//
        $(`#btn${crypto.id}`).click(() => {
            $(`.moreInfo#${crypto.id}`).toggle();
            setTimeout(() => {
                moreInfoBtn(crypto.id)
            },200);
            $(`.moreInfo#${crypto.id}`).html(`
                <i class="fas fa-sync fa-spin fa-2x"></i>
            `)    
        })


        //===Check Toggle===//

        $(`#${crypto.id}-switch`).click((e) => {
            

            if (cryptoSelectArr.length < 5) {

                if (e.target.checked == true) {
                    console.log(e.target.id);
                    console.log("checked");
                    cryptoSelectArr.push(crypto.id)
                    console.log(cryptoSelectArr);


                } else {
                    console.log("Not checked");
                    let removeSelCrypto = crypto.id
                    cryptoSelectArr.splice($.inArray(removeSelCrypto, cryptoSelectArr), 1);
                    $(`#${crypto.id}-switch`).prop('checked', false)
                    console.log(cryptoSelectArr);
                }

            } else {

                $("#myModal").modal("show");
                showModalHandler()


                $(`#${crypto.id}-switch`).prop('checked', false)
                $(`.intoggle`).click((e) => {
                    console.log(e.target.id);
                    console.log(cryptoSelectArr);
                    $(`.save-btn`).click(()=> {

                        if (e.target.checked == false) {
                            let removeSelCrypto = e.target.id;
                            let arttt = cryptoSelectArr.indexOf(removeSelCrypto)
    
                            cryptoSelectArr.splice(arttt, 1);
                            $(`#${removeSelCrypto}-switch`).prop('checked', false)
    
                            console.log(cryptoSelectArr);
    
                        } else if (e.target.checked == true) {
                            
                                let removeSelCrypto = e.target.id;
                                cryptoSelectArr.push(removeSelCrypto)
                                $(`#${removeSelCrypto}-switch`).prop('checked', true)
                                console.log(cryptoSelectArr);
    
                            
                        }
                    })

                })


            }





        })



    }

    //====== Home Page =========//
    $(`.home`).click(() => {
        cryptoForGraph0 = [];
        cryptoForGraph1 = [];
        cryptoForGraph2 = [];
        cryptoForGraph3 = [];
        cryptoForGraph4 = [];

        $(".container").empty()
        localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        for (const crypto of localCrypto) {

            CryptoDraw(crypto)
            if (cryptoSelectArr.length > 0) {
                cryptoSelectArr.forEach(cryptoCoinslc => {
                    if (cryptoCoinslc == crypto.id) {
                        $(`#${cryptoCoinslc}-switch`).prop("checked", true)

                    }
                });


            }

        }

    })



    //========== Show Modal =============//
    function showModalHandler() {
        $(".modal-body").empty()
        for (const items of cryptoSelectArr) {
            $(".modal-body").append(`  
                
                 <li>
                    <span class="coinsToggle"> ${items} </span>
                    <label class="switch">
                        <input class="intoggle" type="checkbox" checked="checked" id="${items}">
                        <span class="slider round"></span>
                    </label>                                                         
                </li>

            `)
        }
    }

    //============input Search button======//
    localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
    $(`#btnInp`).click(() => SearchCrypto())

    function SearchCrypto() {
        $(".container").empty()
        let filteredCrypto = localCrypto.filter(
            crypto => crypto.symbol.toLowerCase().includes($(`#inpSearch`).val().toLowerCase())
        )
        console.log(filteredCrypto);
        for (const crypto of filteredCrypto) {
            CryptoDraw(crypto)
            if (cryptoSelectArr.length > 0) {
                cryptoSelectArr.forEach(cryptoCoinslc => {
                    if (cryptoCoinslc == crypto.id) {
                        $(`#${cryptoCoinslc}-switch`).prop("checked", true)

                    }
                });


            }

        }
        if (!filteredCrypto.length) {
            $('.container').html(`
                <div class="notfound">
                
                <h2> Crypto Coin Not Found 😕!! Please Try Again 😀 </h2>
                <h2> Use Crypto Symbol aka: "BTC" </h2>
                </div>
            `)
        }

    }


    //====== About Page =========//
    $('.about').click(() => {
        setTimeout(() => {
            $(".container").html("")
            $(".container").html($(".container").html() + `
                <div class="row">
                    <div class="col-6">
                    
                            <h3>Im Eyal Sberro</h3>
                            <p>I have a BA in Business Administration, Specialization in Network Sciences from the Interdisciplinary Center (IDC), Herzliya.</p>
                            <p>I'm currently learning to be a FullStack Developer at "John Bryce" finishing in March 2022.</p>
                            <p>I was a Co-founder at Dvora.io, a personalized gift matcher.</p>
                            <p>Skilled in Operations, Sales, Marketing, Instagram, and Influencer Marketing, WordPress development, Photographing, and Picture editing.</p>
                            <div class="links">
                            <a href="http://www.linkedin.com/in/eyalsberro"><i class="fab fa-linkedin-in fa-2x"></i></a>
                            <a href="http://www.eyalsberro.com"><i class="fas fa-globe-americas fa-2x"></i></a>
                            <a href="https://www.instagram.com/eyalsberro/"><i class="fab fa-instagram fa-2x"></i></a>
                            </div>
                    </div>
                    <div class="col-6">
                        <img src="DSC_0185.jpg" class=eyalpicture">

                    </div>
                </div>

            `)
        }, 1000);
        $(".container").html("")
        $(".container").html($(".container").html() + `
        
            <i class="fas fa-sync fa-spin fa-5x"></i>

        `)


    })

    //====== MoreInfo Btn function =========//
    function moreInfoBtn(cryptoId) {
        let liveTime = Date.now();
        let localMoreInfo = JSON.parse(localStorage.getItem(`${cryptoId}`));
        if (localMoreInfo != null && (liveTime - localMoreInfo.time) < 120000) {
            console.log("Info From LocalStorge");

            $(`.moreInfo#${cryptoId}`).html(`
                    <img src=${localMoreInfo.image.small}>
                    <p><b>USD:</b>  $${localMoreInfo.market_data.current_price.usd} </p>
                    <p><b>ILS:</b>  ${localMoreInfo.market_data.current_price.ils} ₪</p>
                    <p><b>Euro:</b>  ${localMoreInfo.market_data.current_price.eur} €</p>
                    
                `)
        } else {
            console.log("Not in localStorge OR more than 2 Min");
            $.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, dataCrypto => {
                $(`.moreInfo#${cryptoId}`).html(`
                         <img src=${dataCrypto.image.small}>
                         <p><b>USD:</b>  $${dataCrypto.market_data.current_price.usd} </p>
                         <p><b>ILS:</b>  ${dataCrypto.market_data.current_price.ils}₪</p>
                         <p><b>Euro:</b>  ${dataCrypto.market_data.current_price.eur}€</p>
                    `)
                dataCrypto.time = Date.now();
                localStorage.setItem(`${dataCrypto.id}`, JSON.stringify(dataCrypto));
            })
        }


    }

    //====== Live Report Page =========//
    $(`.liveReport`).click(() => {
        cryptoSymbol = []
        localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        for (const crypto of localCrypto) {
            if (cryptoSelectArr.includes(crypto.id)) {
                cryptoSymbol.push(crypto.symbol)
            }
        }
        setTimeout(() => {
            dataFromCrypto()
        },1000);
        $(`.container`).html(`
            <i class="fas fa-sync fa-spin fa-2x love"></i>
        `)
        
    })


    function dataFromCrypto() {
        $.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoSymbol[0]},${cryptoSymbol[1]},${cryptoSymbol[2]},${cryptoSymbol[3]},${cryptoSymbol[4]}&tsyms=USD`, (dataFromCrypto) => {

            if (dataFromCrypto.Response === "Error") {
                $('.container').html(`<div class="noneselectedmsg"> <h2>Oops.. No data on selected currencies</h2> </div>`);

            } else {

                $('.container').html($chartContainer);
                let set = 1;
                currentTime = [];

                for (let key in dataFromCrypto) {
                    switch (set) {
                        case 1:
                            cryptoForGraph0.push({ x: new Date(), y: dataFromCrypto[key].USD });
                            currentTime.push(key);
                            break;
                        case 2:
                            cryptoForGraph1.push({ x: new Date(), y: dataFromCrypto[key].USD });
                            currentTime.push(key);
                            break;
                        case 3:
                            cryptoForGraph2.push({ x: new Date(), y: dataFromCrypto[key].USD });
                            currentTime.push(key);
                            break;
                        case 4:
                            cryptoForGraph3.push({ x: new Date(), y: dataFromCrypto[key].USD });
                            currentTime.push(key);
                            break;
                        case 5:
                            cryptoForGraph4.push({ x: new Date(), y: dataFromCrypto[key].USD });
                            currentTime.push(key);
                            break;
                    }
                    set++;
                }
                showGraphOnPage();

            }
        })
    }

    function showGraphOnPage() {

        let chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: `Showing Crypto Coin: ${cryptoSymbol} to USD`
            },
            axisX: {
                valueFormatString: "HH:mm:ss"
            },

            axisY: {
                title: "Crypto Price USD",
                titleFontColor: "#369EAD",
                lineColor: "#369EAD",
                labelFontColor: "#369EAD",
                tickColor: "#369EAD",
                prefix: "$",
                includeZero: false
            },

            toolTip: {
                shared: true
            },

            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },

            data: [
                {
                    type: "line",
                    name: currentTime[0],
                    showInLegend: true,
                    xValueFormatString: "HH:mm",
                    dataPoints: cryptoForGraph0

                },

                {
                    type: "line",
                    name: currentTime[1],
                    showInLegend: true,
                    xValueFormatString: "HH:mm",
                    dataPoints: cryptoForGraph1

                },

                {

                    type: "line",
                    name: currentTime[2],
                    showInLegend: true,
                    xValueFormatString: "HH:mm",
                    dataPoints: cryptoForGraph2

                },

                {

                    type: "line",
                    name: currentTime[3],
                    showInLegend: true,
                    xValueFormatString: "HH:mm",
                    dataPoints: cryptoForGraph3

                },

                {

                    type: "line",
                    name: currentTime[4],
                    showInLegend: true,
                    xValueFormatString: "HH:mm",
                    dataPoints: cryptoForGraph4

                }
            ]
        }
        );

        chart.render();

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
    }
})

let $chartContainer = `<div id="chartContainer"></div>`