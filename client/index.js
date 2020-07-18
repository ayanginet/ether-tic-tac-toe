import Web3 from "web3";
import Game from '../build/contracts/Game.json';

let web3;
let game;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum)
                    );
                })
                .catch(e => {
                    reject(e);
                });
            return;
        }
        if (typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        console.log("LocalHost");
        resolve(new Web3('http://localhost:9545'));
    });
};

const initContract = () => {
    let deployementKey = Object.keys(Game.networks)[0];
    console.log("Network", deployementKey);
    return new web3.eth.Contract(
        Game.abi,
        Game
            .networks[deployementKey]
            .address
    );
};

const initApp = () => {
    var started = false;

    var start_button = document.getElementById("start");

    var btn_1 = document.getElementById('btn-1');
    var btn_2 = document.getElementById('btn-2');
    var btn_3 = document.getElementById('btn-3');

    var btn_4 = document.getElementById('btn-4');
    var btn_5 = document.getElementById('btn-5');
    var btn_6 = document.getElementById('btn-6');

    var btn_7 = document.getElementById('btn-7');
    var btn_8 = document.getElementById('btn-8');
    var btn_9 = document.getElementById('btn-9');

    btn_1.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_1);
    });
    btn_2.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_2);
    });
    btn_3.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_3);
    });

    btn_4.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_4);
    });
    btn_5.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_5);
    });
    btn_6.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_6);
    });

    btn_7.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_7);
    });
    btn_8.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_8);
    });
    btn_9.addEventListener('click', e => {
        e.preventDefault();
        button_click(btn_9);
    });

    var button_click = function (button) {
        if (started == false) {
            alert("Press start first");
            return;
        }

        let number = button.value - 1;
        let x = (number / 3) >> 0;
        let y = number % 3;
        let player = accounts[0];

        game.methods
            .makeMove(player, x, y)
            .send({ from: accounts[0] })
            .then((reponse) => {
                button.innerHTML = "X";
                updateUI(reponse);
            });
    }

    let accounts = [];
    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
        });

    start_button.addEventListener('click', (e) => {
        e.preventDefault();
        game.methods
            .initBoard()
            .send({ from: accounts[0] })
            .then(() => {
                alert("Game has started");
            }
            );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            game = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
})