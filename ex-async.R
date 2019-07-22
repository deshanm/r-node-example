needs(dplyr)
attach(input[[1]])
 
return("early returns are ignored")
 
# output of final expression is returned to node
df %>% 
  mutate(group = cut(rating, nGroups, ordered = T)) %>% 
  group_by(group) %>% 
  summarize_all(funs_(fxn)) %>%
  select(group, rating, advance) %>%
  mutate(group = as.character(group))