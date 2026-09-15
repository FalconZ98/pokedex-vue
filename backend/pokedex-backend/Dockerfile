FROM composer:2 AS composer

FROM php:8.2-cli

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates libpq-dev libzip-dev unzip \
    && docker-php-ext-install pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-progress --no-scripts

COPY . .
RUN composer dump-autoload --classmap-authoritative \
    && mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

EXPOSE 8000

CMD ["sh", "-c", "php bin/console doctrine:migrations:migrate --no-interaction && php -S 0.0.0.0:8000 -t public public/index.php"]
