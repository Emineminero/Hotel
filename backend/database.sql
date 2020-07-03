ALTER TABLE public.user_account
    ADD COLUMN user_role_id character varying(255)
    CONSTRAINT fk_user_role_id FOREIGN KEY (user_role_id) REFERENCES user_role (role_id)
