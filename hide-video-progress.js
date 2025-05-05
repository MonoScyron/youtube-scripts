// ==UserScript==
// @name         Hide Youtube Video Progress
// @namespace    https://github.com/MonoScyron/youtube-scripts
// @version      1.0.2
// @description  Add toggle to hide Youtube video progress
// @author       MonoScyron
// @updateURL    https://raw.githubusercontent.com/MonoScyron/youtube-scripts/main/hide-video-progress.js
// @downloadURL  https://raw.githubusercontent.com/MonoScyron/youtube-scripts/main/hide-video-progress.js
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hideProgressClass = 'ytp-hide';
    const styleAdd = [
        'div.ytp-progress-bar',
        'span.ytp-time-separator',
        'span.ytp-time-duration'
    ]

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    function toggleYTProgress(checkbox, showKnob, hideKnob) {
        if(checkbox.checked) {
            for(let s of styleAdd) {
                document.querySelector(s).classList.add(hideProgressClass);
            }
            showKnob.classList.add(hideProgressClass);
            hideKnob.classList.remove(hideProgressClass);
        }
        else {
            for(let s of styleAdd) {
                document.querySelector(s).classList.remove(hideProgressClass);
            }
            hideKnob.classList.add(hideProgressClass);
            showKnob.classList.remove(hideProgressClass);
        }
    }

    const style = document.createElement('style');
    style.id = 'hide-yt-progress-style';
    style.textContent = `div.${hideProgressClass}, span.${hideProgressClass} { 
            display: none; 
        }
        
        svg.${hideProgressClass} {
            opacity: 0;
        }
        
        .hide-yt-progress-label {
            width: 4.5rem;
            height: 100%;
            padding: 0 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        input#hide-yt-progress-toggle {
            transform: scale(0);
        }

        .hide-yt-progress-container {
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;
        }

        .hide-yt-progress-knob {
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .85);
            padding: 1px;
            fill: none;
            position: absolute;
            width: 2.5rem;
            height: 2.5rem;
            transition: transform 0.1s;
        }
        
        input#hide-yt-progress-toggle {
            display: none;        
        }
    `;
    document.head.appendChild(style);

    const toggleHtml = `<label class="hide-yt-progress-label"  title="Hide/Show Progress Bar">
        <input id="hide-yt-progress-toggle" type="checkbox"/>
        <span class="hide-yt-progress-container">
            <svg class="hide-yt-progress-knob"
                id="hide-yt-progress-show"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <svg class="hide-yt-progress-knob ${hideProgressClass}"
                id="hide-yt-progress-hide"
                viewBox="0 1 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </span>
    </label>`

    const toggle = createElementFromHTML(toggleHtml);

    const observer = new MutationObserver(() => {
        const parent = document.querySelector('div.ytp-right-controls');
        const targetChild = parent?.querySelector('button.ytp-autonav-toggle.ytp-button');

        if(parent && targetChild) {
            parent.insertBefore(toggle, targetChild.previousSibling);

            const showKnob = document.getElementById('hide-yt-progress-show');
            const hideKnob = document.getElementById('hide-yt-progress-hide');
            const toggleCheck = document.getElementById('hide-yt-progress-toggle');
            toggleCheck.addEventListener('change', () => toggleYTProgress(toggleCheck, showKnob, hideKnob));

            observer.disconnect();
        }
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

})();