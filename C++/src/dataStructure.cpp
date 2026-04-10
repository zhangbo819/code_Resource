#include <iostream>
#include <vector>
// #include <algorithm>

using namespace std;

void dataStructure()
{

    // 字符串
    std::string s = "hello";
    s += " world";

    cout << s << endl;

    // 动态数组
    std::vector<int> v = {3, 1, 2};
    v.push_back(4);

    // 排序
    std::sort(v.begin(), v.end());

    for (int i = 0; i < v.size(); i++)
    {
        cout << v[i] << " ";
    }

    cout << '\n';

    // 二元组
    std::pair<int, std::string> p = {1, "a"};
    cout << p.first << " " << p.second << endl;

    std::sort(v.begin(), v.end());
}