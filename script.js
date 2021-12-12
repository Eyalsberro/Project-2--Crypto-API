$(() => {


    let cryptoSelectArr = []
    let selectedCoinsSymbol = []
    let RemovedCoinsArr = [];
    let localCrypto;


    $.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=10`, cryptos => {
        console.log(cryptos)
        if (localStorage.getItem("localCrypto")) {
            localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        } else {
            localStorage.setItem("localCrypto", JSON.stringify(cryptos))
        }

        for (const crypto of localCrypto) {

            CryptoDraw(crypto)






        }
        
    })

    
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
            setTimeout(() => {
                $.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}`, dataCrypto => {
                    $(`.moreInfo#${crypto.id}`).toggle();
                    return $(`.moreInfo#${crypto.id}`).html(`
                        <img src=${dataCrypto.image.small}>
                        <p><b>USD:</b>  $${dataCrypto.market_data.current_price.usd} </p>
                        <p><b>ILS:</b>  ${dataCrypto.market_data.current_price.ils}₪</p>
                        <p><b>Euro:</b>  ${dataCrypto.market_data.current_price.eur}€</p>
                    
                    `)

                })

            }, 1000);

            $(`.moreInfo#${crypto.id}`).html(`
                <i class="fas fa-spinner fa-pulse"></i>
            
            `)
            

        })


        //===Check Toggle===//
        $(`#${crypto.id}-switch.checswitch`).click((e) => {
            let coinid = e.target.id;
            let name = crypto.id

            if (cryptoSelectArr.length < 5) {
                if (e.target.checked == true) {
                    cryptoSelectArr.push({ coinid, name });

                    console.log(cryptoSelectArr);
                } else {

                    cryptoSelectArr.pop(($.inArray(e.target)));
                    console.log(cryptoSelectArr);
                }
            } else {
                if (e.target.checked == false) {
                    $(`.intoggle#${coinid}`).prop('checked', false);
                    cryptoSelectArr.pop(($.inArray(e.target)));
                } else {
                    e.preventDefault()
                    for (const items of cryptoSelectArr) {
                     
                        $(".toggledCoins").append(`
            
                            <li>
                               <span class="coinsToggle"> ${items.name} </span>
                                <label class="switch">
                                    <input class="intoggle" type="checkbox" checked="checked" id="${items.coinid}">
                                    <span class="slider round"></span>
                                </label>                                                         
                            </li>
      
                        `)
                    }
                    $(".toggledCoins").append(`<button id="btntoggle" class="btn btn-danger btntoggle"> Cancel</button>`)
                    $(".toggledCoins").append(`<button id="btntoggle" class="btn btn-primary btntoggle1"> Okay</button>`)

                    $(`.intoggle`).click((e) => {
                        if (e.target.checked == false) {
                            let id = e.currentTarget.id;
                            cryptoSelectArr.pop(($.inArray(e.target)));
                            console.log(cryptoSelectArr);

                            // if (e.target.checked == false) {
                            //     // $(`.intoggle#${id}`).prop("checked", false);
                            //     // $(`.intoggle#${coinid}`).prop("checked", true);
                            //     // cryptoSelectArr = cryptoSelectArr.filter((e) => e.coinid != id);
                            //     console.log(cryptoSelectArr2);
                            // }
                        }

                    })

                    $(`.btntoggle1`).click(() => {
                        $(`#${crypto.id}-switch.checswitch`).prop("checked", false);
                        $(".toggledCoins").css("display", "none");

                    })

                }
            }

        })






    }

    

    //============input button======//
    localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
    $(`#btnInp`).click(() => SearchCrypto())

    function SearchCrypto() {

        let filteredCrypto = localCrypto.filter(
            crypto => crypto.symbol.toLowerCase().includes($(`#inpSearch`).val().toLowerCase())
        )
        console.log(filteredCrypto);
        $(".container").empty()
        for (const crypto of filteredCrypto) {
            CryptoDraw(crypto)

        }
        if (!filteredCrypto.length) {
            $('.container').html(`
                <div class="notfound">
                
                <h2> Crypto Coin Not Find!! Please Try Again 😀 </h2>
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

                <div class="col">
                   
                        <h2>Im Eyal Sberro</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ipsum omnis tempora exercitationem consequuntu</p>
                  
                </div>

            `)
        }, 1000);
        $(".container").html("")
        $(".container").html($(".container").html() + `
        
            <i class="fas fa-sync fa-spin fa-10x"></i>

        `)


    })


    //====== Home Page =========//
    $(`.home`).click(() => {
        $(".container").empty()
        localCrypto = JSON.parse(localStorage.getItem("localCrypto"))
        for (const crypto of localCrypto) {

            CryptoDraw(crypto)
            if (cryptoSelectArr.length > 0) {
                cryptoSelectArr.forEach(cryptoCoinslc => {
                    if (cryptoCoinslc == crypto.id) {
                        $(`#${cryptoCoinslc} -switch`).prop("checked", true)

                    }
                });


            }

        }

    })


    // function CheckToggle(cryptoCoinSelect) {
    //     if ($(`#${ cryptoCoinSelect.id } -switch`).prop('checked')) {
    //         console.log("checked");
    //         cryptoSelectArr.push(cryptoCoinSelect.id)
    //         console.log(cryptoSelectArr);
    //         if (cryptoSelectArr.length > 5) {
    //             // alert("You cant chose more then 5 coins")

    //             let removeSelCrypto = this.id
    //             cryptoSelectArr.splice($.inArray(removeSelCrypto, cryptoSelectArr), 1);
    //             console.log(cryptoSelectArr);
    //             popWindowContent(cryptoCoinSelect)
    //             $(`#${ cryptoCoinSelect.id } -switch`).prop('checked', false)

    //         }
    //     } else {
    //         console.log("Not checked");
    //         let removeSelCrypto = cryptoCoinSelect.id
    //         cryptoSelectArr.splice($.inArray(removeSelCrypto, cryptoSelectArr), 1);
    //         console.log(cryptoSelectArr);
    //     }


    // }


    function popWindowContent() {
        let toggle = `<ul class="toggledCoins">`
        cryptoSelectArr.forEach((selectedCoins) => {
            toggle += `
          <li>
              <span class="coinsToggle"> ${selectedCoins} </span>
              <div class="on-off-btn">
                 <label class="switch button-toggle" >
                    <input type="checkbox" checked="checked" id="${selectedCoins}-id1">
                    <span class="slider round" ></span>
                 </label>   
               </div>
    
          </li>`
        })

        toggle += `</ul>`;
        return toggle;

    };






})

