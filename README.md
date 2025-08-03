# Test Automation training from jaktestowac.pl

## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie/

- dodatkowa lekcja o HTML https://www.youtube.com/watch?v=HfTzZFE7Gv0

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```


## Skróty/tips
- npm - node package manager
- npx - node package executor

odnośnie readme.md:
- "#' - nagłówek (ilość hashy zmienia się zagnieżdżenie nagłówków czyli np 1hash duży nagłówek, 2hash mniejszy itp itd)
- '-' myślnik - lista
- ` backtick - otoczenie tekstu - ``` oznaczenie w wielu liniach
- dwie spacje - łamanie linii

<u>getByTestId</u><b>('login-input')</b><br>
<u>Jak</u> odnajdujemy element | <b>Adres</b> elementu<br>
<u>lokator</u> - metoda w jaki sposób łapiemy element (np. getByTestId)<br>
<b>selektor</b> - adres elementu (np. 'login-input')


## opis co robi

- test.describe('jakas nazwa', () => { - łączy test w grupy 
- .blur - odfocusowuje jakis element na stronie np. textfield
- test.only - wykonuje tylko testy z tym dopiskiem

- w devtools - RMB na elemencie, copy css selector, w konsoli devtools mozna sprawdzic locator
