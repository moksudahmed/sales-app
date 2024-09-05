BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL,
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

--INFO  [alembic.runtime.migration] Running upgrade  -> 605f2c8a2f6c, Initial migration
-- Running upgrade  -> 605f2c8a2f6c

CREATE TABLE "user" (
    id SERIAL NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    is_superuser BOOLEAN NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_user_username ON "user" (username);

CREATE UNIQUE INDEX ix_user_email ON "user" (email);

CREATE INDEX ix_user_id ON "user" (id);

CREATE TABLE product (
    id SERIAL NOT NULL,
    title VARCHAR NOT NULL,
    unit_price FLOAT NOT NULL,
    stock INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ix_product_title ON product (title);

CREATE INDEX ix_product_id ON product (id);

CREATE TABLE sale (
    id SERIAL NOT NULL,
    user_id INTEGER NOT NULL,
    total FLOAT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES "user" (id)
);

CREATE INDEX ix_sale_id ON sale (id);

CREATE TABLE sale_product (
    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total_price FLOAT NOT NULL,
    PRIMARY KEY (sale_id, product_id),
    FOREIGN KEY(sale_id) REFERENCES sale (id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES product (id) ON DELETE CASCADE
);

INSERT INTO alembic_version (version_num) VALUES ('605f2c8a2f6c') RETURNING alembic_version.version_num;

COMMIT;