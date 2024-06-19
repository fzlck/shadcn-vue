<script setup lang="ts">
import { cn } from '@/lib/utils'
import { RouterLink } from 'vue-router';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from '@/overview/components/LocaleSwitcher.vue';
import navigate from '@/router/navigate';

const linkClasses = 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary';
const linkActiveClass = () => cn('text-slate-800');
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <img src="@/assets/logo.jpg" width="150" />
    <RouterLink to="/" :activeClass="linkActiveClass" :class="cn(linkClasses)">{{ $t('order', 2) }}</RouterLink>
    <RouterLink to="/requests" :activeClass="linkActiveClass" :class="cn(linkClasses)">{{ $t('requests', 2) }}
    </RouterLink>
  </nav>
  <div class="ml-auto flex items-center space-x-4">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="relative h-15 w-15 rounded-full text-lg">{{ $t('preferences_icon', 1) }}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
              {{ $t('pre_name', 1) }} {{ $t('name', 1) }}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ $t('login_name'), 1 }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem :onSelect="navigate.profil">
            <RouterLink to="/profil">{{ $t('profil_edit') }}</RouterLink>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LocaleSwitcher />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem :onSelect="navigate.settings">
            <RouterLink to="/settings">{{ $t('settings') }}</RouterLink>
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {{ $t('logout') }}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>