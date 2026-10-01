-- Separate homepage tile image from the blog cover / article image.
alter table public.blogs
  add column if not exists card_image text;
