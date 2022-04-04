<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // reset cached roles and permissions
        app()[
            \Spatie\Permission\PermissionRegistrar::class
        ]->forgetCachedPermissions();

        // create the permissions
       $permissionNames = [
           'role-list',
           'role-create',
           'role-edit',
           'role-delete',
           'post-list',
           'post-create',
           'post-edit',
           'post-delete',
           'category-list',
           'category-create',
           'category-edit',
           'category-delete',
           'comment-list',
           'comment-create',
           'comment-edit',
           'tag-list',
           'tag-create',
           'tag-edit',
           'tag-delete',
           'book-list',
           'home-list',
           'user-list',
           'user-create',
           'user-edit',
           'user-delete',
           'reply-create',
           'reply-edit',
           'reply-delete',
        ];
        $permissions = collect($permissionNames)->map(function($permission)
        {
            return ["name" => $permission, "guard_name" => "api"];
        });

        Permission::insert($permissions->toArray());

        // create the roles and set up the permissions to be established with them
        Role::create(["name" => "superadmin"]);
        Role::create(["name" => "admin"])->givePermissionTo(Permission::all());
        Role::create(["name" => "author"])->givePermissionTo([
           'post-list',
           'post-create',
           'post-edit',
           'post-delete',
           'book-list',
           'comment-list',
           'comment-create',
           'comment-edit',
           'reply-create',
           'reply-edit',
           'reply-delete',
           'user-list',
           'user-edit',
        ]);

        User::find(1)->assignRole('superadmin');
        User::find(2)->assignRole('admin');
        User::find(3)->assignRole('author');
    }   
}
