# Проект валидации кодов различных классификаторов

Этот проект включает в себя скрипты для первоначальной проверки кодов различных российских и международных классификаторов, таких как ИНН, ОГРН, СНИЛС и другие. В процессе валидации используются различные методы, включая ключевание кодов для более точной проверки.

## Содержание
- [Расчетный счет](https://www.raiffeisen.ru/wiki/chto-takoe-raschetnyj-schet-v-banke/)
- [Корреспонденсткий счет](https://journal.tinkoff.ru/guide/korschet/)
- [БИК](https://dadata.ru/blog/basics/bik/)
- [Номер карты](https://www.raiffeisen.ru/wiki/nomer-karty-bankovskoj/)
- [ИНН](https://dadata.ru/blog/basics/chto-takoe-inn/)
- [КПП](https://dadata.ru/blog/basics/kpp/)
- [ОГРН](https://dadata.ru/blog/basics/ogrn/)
- [ОКПО](https://dadata.ru/blog/basics/okpo/)
- [СНИЛС](https://www.gosuslugi.ru/help/faq/snils/2007)
- [VIN](https://avilon.ru/articles/chto-takoe-vin-kod-avtomobilya/)

## Установка

```sh
npm i keying
```

## Использование

JavaScript:
```
const validateInn = require("keying").validateInn;
console.log('Проверка ИНН:',validateInn(6663003127))

const validateAcc = require("keying").validateAcc;
console.log('Проверка расчетного счета:',validateAcc("40703810338000004033", "044525225"))

const validateAccCorr = require("keying").validateAccCorr;
console.log('Проверка корреспонденского счета:',validateAccCorr("30101810400000000225", "044525225"))

const validateBik = require("keying").validateBik;
console.log('Проверка БИК:',validateBik("044525769"))

const validateCard = require("keying").validateCard;
console.log('Проверка карты:',validateCard("4012888888881881"))

const validateKpp = require("keying").validateKpp;
console.log('Проверка КПП:',validateKpp("667101001"))

const validateOgrn = require("keying").validateOgrn;
console.log('Проверка ОГРН:',validateOgrn("1026605606620"))

const validateOkpo = require("keying").validateOkpo;
console.log('Проверка ОКПО:',validateOkpo("00242766"))

const validateSnils = require("keying").validateSnils;
console.log('Проверка СНИЛС:',validateSnils("342 932 447 76"))

const validateVin = require("keying").validateVin;
console.log('Проверка VIN:',validateVin("JHMCM56557C404453"))
```

TypeScript:
```

import { validateInn } from 'keying'
console.log('Проверка ИНН:',validateInn(6663003127))

import { validateAcc } from 'keying'
console.log('Проверка расчетного счета:',validateAcc("40703810338000004033", "044525225"))

import { validateAccCorr } from 'keying'
console.log('Проверка корреспонденского счета:',validateAccCorr("30101810400000000225", "044525225"))

import { validateBik } from 'keying'
console.log('Проверка БИК:',validateBik("044525769"))

import { validateCard } from 'keying'
console.log('Проверка карты:',validateCard("4012888888881881"))

import { validateKpp } from 'keying'
console.log('Проверка КПП:',validateKpp("667101001"))

import { validateOgrn } from 'keying'
console.log('Проверка ОГРН:',validateOgrn("1026605606620"))

import { validateOkpo } from 'keying'
console.log('Проверка ОКПО:',validateOkpo("00242766"))

import { validateSnils } from 'keying'
console.log('Проверка СНИЛС:',validateSnils("342 932 447 76"))

import { validateVin } from 'keying'
console.log('Проверка VIN:',validateVin("JHMCM56557C404453"))
```

## To do
- [ ] Проверку паспортных данных, [статья в помощь, оч. интересно](https://habr.com/ru/companies/hflabs/articles/478538/) + [dadata](https://dadata.ru/api/clean/passport/)
- [ ] Всё переписать

## P.S.
- ОКАТО ключуется, если в конце добавить цифру ключ, никто так не делает и с 2014 есть ОКТМО, который не ключуется или ключуется так же х.з.

## Источники
[КлассИнформ - Справочник кодов общероссийских классификаторов](https://classinform.ru)

[DaData](https://dadata.ru/blog/basics/)

[Общероссийские классификаторы технико-экономической и социальной информации](https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%89%D0%B5%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B5_%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80%D1%8B_%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%BE-%D1%8D%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9_%D0%B8_%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9_%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8)

[Алгоритмы ключевание некоторых идентификаторов](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D1%80%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE#.D0.A1.D1.82.D1.80.D0.B0.D1.85.D0.BE.D0.B2.D0.BE.D0.B9_.D0.BD.D0.BE.D0.BC.D0.B5.D1.80_.D0.B8.D0.BD.D0.B4.D0.B8.D0.B2.D0.B8.D0.B4.D1.83.D0.B0.D0.BB.D1.8C.D0.BD.D0.BE.D0.B3.D0.BE_.D0.BB.D0.B8.D1.86.D0.B5.D0.B2.D0.BE.D0.B3.D0.BE_.D1.81.D1.87.D1.91.D1.82.D0.B0_.28.D0.A0.D0.BE.D1.81.D1.81.D0.B8.D1.8F.29)

[Сервис с API для определения по BIN/IIN банковской карты эмитента ](https://binlist.net/)

[Проект для генерации ИНН и ОГРН и т.д. на Ruby](https://github.com/asiniy/faker-russian?tab=readme-ov-file)

[Проект для проверки ИНН и ОГРН и т.д. на Ruby](https://github.com/asiniy/faker-russian?tab=readme-ov-file)

[Сгенерировать ИНН и ОГРН и т.д.](https://1c-user.info/1-generator-inn-onlajn)

[Собрали всем «Хабром» справочник «Кем выдан…» для паспортов. Качайте на здоровье](https://habr.com/ru/companies/hflabs/articles/448504/)
