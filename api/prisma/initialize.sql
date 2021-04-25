--------------
-- 1. DATABASE
--------------
CREATE DATABASE campfarfelu WITH TEMPLATE 'template0' ENCODING 'UTF-8' LC_COLLATE 'C' LC_CTYPE 'en_US.UTF-8';


----------------
-- 2. EXTENSIONS
----------------
CREATE SCHEMA ext;
ALTER DATABASE campfarfelu SET search_path = public, ext;
-- install any extensions here


-----------
-- 3. ROLES
-----------

-- all roles inherit from 'public' - on clean Postgres DB the 'public'
-- role has all privileges on 'public' schema so we must revoke them
REVOKE ALL ON DATABASE campfarfelu FROM public;
REVOKE ALL ON SCHEMA public FROM public;

-- readwrite generic role
CREATE ROLE readwrite;
ALTER ROLE readwrite NOLOGIN NOINHERIT;

GRANT CONNECT, TEMP ON DATABASE campfarfelu TO readwrite;
GRANT USAGE ON SCHEMA public TO readwrite;
GRANT ALL ON ALL TABLES IN SCHEMA public TO readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO readwrite;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO readwrite;

GRANT USAGE ON SCHEMA ext TO readwrite;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA ext TO readwrite;

-- readonly generic role
CREATE ROLE readonly;
ALTER ROLE readonly NOLOGIN NOINHERIT;

GRANT CONNECT, TEMP ON DATABASE campfarfelu TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO readonly;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO readonly;

GRANT USAGE ON SCHEMA ext TO readonly;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA ext TO readonly;

-----------
-- 4. USERS
-----------

-- api (readwrite)
CREATE ROLE api;
ALTER ROLE api PASSWORD 'api' LOGIN INHERIT;
GRANT readwrite TO api;
